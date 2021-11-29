import { Request, Response, NextFunction } from 'express';
const Job = require('../../models/Job');
const CompanyUser = require('../../models/CompanyUser');
const BaseController = require('../BaseController');
import { matchedData } from 'express-validator';

/**
 *
 * @swagger
 *
 * /employer/jobs:
 *   get:
 *     tags:
 *       - employer
 *       - jobs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: order
 *         in: query
 *         required: true
 *         type: string
 *
 * @returns list of job objects.
 */
async function index(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const user = await BaseController.getAuthUser(req);
    const jobs = await Job
      .query()
      .withGraphFetched('[role, employment_type, company, job_responses]')
      .where('user_id', user.id)
      .whereNotDeleted();

    const data = {
      'success': true,
      'jobs': jobs,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Get specified Job
 *
 * @swagger
 *
 * /employer/jobs/{id}:
 *   get:
 *     tags:
 *       - employer
 *       - jobs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *
 * @returns single job object.
 */
async function show(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {

    const { id } = req.params;
    const user = await BaseController.getAuthUser(req);
    const job = await Job
      .query()
      .withGraphFetched('[role, employment_type, company]')
      .where('user_id', user.id)
      .whereNotDeleted()
      .findById(id);

    if (!job) {
      return res.json({
        'success': true,
        'message': 'Job not found.',
      });
    }

    const data = {
      'success': true,
      'job': job,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Create a new Job.
 *
 * @swagger
 *
 * /employer/jobs:
 *   post:
 *     tags:
 *       - employer
 *       - jobs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: job
 *         in: body
 *         required: true
 *         type: Job
 *       - name: options
 *         in: body
 *         required: false
 *         type: object
 *
 * @returns job object.
 */
async function store(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { job, options } = matchedData(req);
    const user = await BaseController.getAuthUser(req);
    job.user_id = user.id;

    if (!options || !options.draft) {
      job.posted_at = Job.knex().fn.now();
    }

    // Set the company id if not already set.
    if (!job.company_id) {
      const userscompaniesSubQuery = CompanyUser.query().where('user_id', user.id).whereNotDeleted();
      const companies = await CompanyUser.relatedQuery('company').for(userscompaniesSubQuery).whereNotDeleted();
      if (companies.length > 0)
        job.company_id = companies[0].id;
    }

    const createdJob = await Job.query().insertAndFetch(job).withGraphFetched('[role, employment_type, company]');

    if (createdJob) {
      const data = {
        'success': true,
        job: createdJob,
      };

      return res.json(data);
    }

    return res.json({ success: false, mes: "Job was not created successfully." });
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Update Job.
 *
 * @swagger
 *
 * /employer/jobs/{id}:
 *   put:
 *     tags:
 *       - employer
 *       - jobs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: job
 *         in: body
 *         required: true
 *         type: Job
 *
 * @returns job object.
 */
async function update(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id } = req.params;
    const { job } = matchedData(req);
    const user = await BaseController.getAuthUser(req);
    job.user_id = user.id;
    const updatedJob = await Job
      .query()
      .whereNotDeleted()
      .where('user_id', user.id)
      .withGraphFetched('[role, employment_type, company]')
      .patchAndFetchById(id, job);

    const data = {
      'success': true,
      'job': updatedJob
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Delete Job.
 *
 * @swagger
 *
 * /employer/jobs:
 *   delete:
 *     tags:
 *       - employer
 *       - jobs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *
 * @returns job object.
 */
async function destroy(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id } = req.params;
    const user = await BaseController.getAuthUser(req);
    const deletedJob = await Job.query().delete().where('user_id', user.id).findById(id);

    const data = {
      'success': true,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Post Job listing.
 *
 * @swagger
 *
 * /employer/jobs/{id}/post:
 *   put:
 *     tags:
 *       - employer
 *       - jobs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: job
 *         in: bodu
 *         required: true
 *         type: integer
 *
 * @returns job object.
 */
async function post(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id } = req.params;
    const { job } = req.body;
    const user = await BaseController.getAuthUser(req);
    job.user_id = user.id;
    const updatedJob = await Job
      .query()
      .whereNotDeleted()
      .where('user_id', user.id)
      .withGraphFetched('[role, employment_type, company]')
      .patchAndFetchById(id, { posted_at: Job.knex().fn.now() });

    const data = {
      'success': true,
      'job': updatedJob
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Pause Job listing.
 *
 * @swagger
 *
 * /employer/jobs/{id}/pause:
 *   put:
 *     tags:
 *       - employer
 *       - jobs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *
 * @returns job object.
 */
async function pause(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id } = req.params;
    const user = await BaseController.getAuthUser(req);

    const updatedJob = await Job
      .query()
      .whereNotDeleted()
      .where('user_id', user.id)
      .withGraphFetched('[role, employment_type, company]')
      .patchAndFetchById(id, { paused_at: Job.knex().fn.now() });

    const data = {
      'success': true,
      'job': updatedJob
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}


/**
 * Resume Job listing.
 *
 * @swagger
 *
 * /employer/jobs/{id}/resume:
 *   put:
 *     tags:
 *       - employer
 *       - jobs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: job
 *         in: body
 *         required: true
 *         type: Job
 *
 * @returns job object.
 */
async function resume(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id } = req.params;
    const { job } = req.body;
    const user = await BaseController.getAuthUser(req);
    job.user_id = user.id;
    const updatedJob = await Job
      .query()
      .whereNotDeleted()
      .where('user_id', user.id)
      .withGraphFetched('[role, employment_type, company]')
      .patchAndFetchById(id, { paused_at: null });

    const data = {
      'success': true,
      'job': updatedJob
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}



module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  pause,
  resume,
  post
}
