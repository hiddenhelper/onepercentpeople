import { Request, Response, NextFunction } from 'express';
const JobResponse = require('../../models/JobResponse');
const Job = require('../../models/Job');
const BaseController = require('../BaseController');

/**
 * Returns all of the job responses that belong to the given job.
 *
 * @swagger
 *
 * /jobs/:id/responses:
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
 *         type: string
 *       - name: page
 *         in: query
 *         required: true
 *         type: string
 *       - name: per_page
 *         in: query
 *         required: true
 *         type: string
 *
 * @returns list of job response objects.
 */
async function index(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id: job_id } = req.params;
    const user = await BaseController.getAuthUser(req);
    const { page = 0 } = req.query,
      { per_page = 25 } = req.query;

    const employersJobs = Job.query()
      .where('user_id', user.id)
      .where('job_id', job_id)
      .whereNotDeleted();

    const job_responses = await Job
      .relatedQuery('job_responses')
      .for(employersJobs)
      .whereNotDeleted()
      .withGraphFetched('[job, user.[country, talent_profiles.[employment_type_preference, english_proficiency]]]')
      .orderBy('created_at', 'desc')
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


module.exports = {
  index,
}
