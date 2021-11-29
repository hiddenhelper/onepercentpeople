import { Request, Response, NextFunction } from 'express';
const JobResponse = require('../../models/JobResponse');
const Job = require('../../models/Job');
const BaseController = require('../BaseController');
import { matchedData } from 'express-validator';

/**
 * Returns all of the job responses that belong to jobs created by the current user.
 *
 * @swagger
 *
 * /jobs/responses:
 *   get:
 *     tags:
 *       - talent
 *       - jobs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         type: integer
 *       - name: per_page
 *         in: query
 *         required: false
 *         type: integer
 *
 * @returns list of job response objects.
 */
async function index(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const user = await BaseController.getAuthUser(req);
    const { page = 0, per_page = 25 } = matchedData(req);

    const employersJobs = Job.query().where('user_id', user.id).whereNotDeleted();

    const job_responses = await Job
      .relatedQuery('job_responses')
      .for(employersJobs)
      .whereNotDeleted()
      .withGraphFetched('[job, user.[country, talent_profiles.[employment_type_preference, english_proficiency]]]')
      .orderBy('job_responses.created_at', 'desc')
      .page(page, per_page);


    const data = {
      success: true,
      job_responses: job_responses.results,
      total: job_responses.total,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Get specified Job Response
 *
 * @swagger
 *
 * /jobs/responses/{id}:
 *   get:
 *     tags:
 *       - talent
 *       - jobs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *
 * @returns single job response object.
 */
async function show(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {

    const { id } = req.params;
    const user = await BaseController.getAuthUser(req);

    const employersJobs = Job.query().where('user_id', user.id).whereNotDeleted();

    const job_response = await Job
      .relatedQuery('job_responses')
      .for(employersJobs)
      .withGraphFetched('[job, user.[country, videos, education.[country, education_level], work_history.country, resumes, talent_profiles.[employment_type_preference, english_proficiency]]]')
      .whereNotDeleted()
      .findById(id);

    if (!job_response) {
      return res.json({
        'success': true,
        'message': 'Job Response not found.',
      });
    }

    const data = {
      'success': true,
      'job_response': job_response,
    };

    res.json(data);
  } catch (err) {
    console.error(err);
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Helper function to update the employer_review_status column on the job_response record.
 * @param review_status:number
 * @returns Response
 */
async function updateEmployerReviewStatus(req: Request, res: Response, next: NextFunction, review_status: number): Promise<void | any> {
  try {
    const { id } = req.params;
    const { job_id } = req.params;
    const user = await BaseController.getAuthUser(req);

    // Check that this Job Response belongs to a job posted by the current employer.
    const job = await Job.query().where('user_id', user.id).findById(job_id);

    if (!job) {
      return res.json({ success: false, mes: "The job response must belong to a job posted by the employer." });
    }
    // Employer can only update certain fields.
    const fields_to_update = { employer_review_status: review_status };

    const updatedJobResponse = await JobResponse
      .query()
      .whereNotDeleted()
      .withGraphFetched('[job, user.talent_profiles]')
      .patchAndFetchById(id, fields_to_update);

    const data = {
      'success': true,
      'job_response': updatedJobResponse
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Mark employer review status as "interested" on the given job response.
 *
 * @swagger
 *
 * /employer/jobs/{job_id}/responses/{id}:
 *   put:
 *     tags:
 *       - employer
 *       - jobs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: job_id
 *         in: params
 *         required: true
 *         type: integer
 *       - name: id
 *         in: params
 *         required: true
 *         type: integer
 *
 * @returns JobResponse object.
 */
async function markInterested(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  const review_status = 1; // interested
  return await updateEmployerReviewStatus(req, res, next, review_status);
}

/**
 * Mark employer review status as "rejected" on the given job response.
 *
 * @swagger
 *
 * /employer/jobs/{job_id}/responses/{id}:
 *   put:
 *     tags:
 *       - employer
 *       - jobs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: job_id
 *         in: params
 *         required: true
 *         type: integer
 *       - name: id
 *         in: params
 *         required: true
 *         type: integer
 *
 * @returns JobResponse object.
 */
async function markRejected(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  const review_status = 2; // rejected
  return await updateEmployerReviewStatus(req, res, next, review_status);
}

/**
 * Hire the job applicant.
 *
 * @swagger
 *
 * /employer/jobs/responses/{id}:
 *   put:
 *     tags:
 *       - employer
 *       - jobs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: params
 *         required: true
 *         type: integer
 *
 * @returns JobResponse object.
 */
async function hire(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id } = req.params;
    // TODO: Create an employment record.
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}



module.exports = {
  index,
  show,
  markInterested,
  markRejected,
  hire,
}
