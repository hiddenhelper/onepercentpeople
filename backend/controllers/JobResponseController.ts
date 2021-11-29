import { Request, Response, NextFunction } from 'express';
const JobResponse = require('../models/JobResponse');
const BaseController = require('./BaseController');
import { matchedData } from 'express-validator';

/**
 * Returns all of the job responses that the current user has created.
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
 *       - name: order
 *         in: query
 *         required: true
 *         type: string
 *
 * @returns list of job response objects.
 */
async function index(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const user = await BaseController.getAuthUser(req);
    const { page = 0 } = req.query,
      { per_page = 25 } = req.query;

    const job_responses = await JobResponse
      .query()
      .where('user_id', user.id)
      .whereNotDeleted()
      .withGraphFetched('[job]')
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
    const job_response = await JobResponse
      .query()
      .where('user_id', user.id)
      .withGraphFetched('[job]')
      .whereNotDeleted()
      .findById(id);

    if (!job_response) {
      return res.json({
        'success': true,
        'message': 'Jobs Response not found.',
      });
    }

    const data = {
      'success': true,
      'job_response': job_response,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Create a Job Response
 *
 * @swagger
 *
 * /jobs/{id}:
 *   post:
 *     tags:
 *       - talent
 *       - jobs
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: job_response
 *         in: body
 *         required: true
 *         type: JobResponse
 *
 * @returns single job response object.
 */
async function store(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    let { job_response } = matchedData(req);

    const user = await BaseController.getAuthUser(req);
    job_response.user_id = user.id;

    const createdJobResponse = await JobResponse.query().insertAndFetch(job_response).withGraphFetched('[job]');
    if (createdJobResponse) {
      const data = {
        'success': true,
        job_response: createdJobResponse,
      };

      return res.json(data);
    }

    return res.json({ success: false, mes: "Job Response was not created successfully." });
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}


module.exports = {
  index,
  show,
  store,
}
