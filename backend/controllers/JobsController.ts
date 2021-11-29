import { Request, Response, NextFunction } from 'express';
const Job = require('../models/Job');
const BaseController = require('./BaseController');

/**
 *
 * @swagger
 *
 * /jobs:
 *   get:
 *     tags:
 *       - talent
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
    // const user = await BaseController.getAuthUser(req);
    const { page = 0 } = req.query,
      { per_page = 25 } = req.query;

    const jobs = await Job
      .query()
      .withGraphFetched('[role, employment_type, company]')
      .modify('openToApplications')
      .page(page, per_page);

    const data = {
      success: true,
      jobs: jobs.results,
      total: jobs.total,
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
 * /jobs/{id}:
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
 * @returns single job object.
 */
async function show(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {

    const { id } = req.params;
    const user = await BaseController.getAuthUser(req);
    const job = await Job
      .query()
      .withGraphFetched('[role, employment_type, company]')
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


module.exports = {
  index,
  show,
}
