import { Request, Response, NextFunction } from 'express';
const JobResponse = require('../models/JobResponse');
const BaseController = require('./BaseController');

/**
 * Get job response for the given job.
 *
 * @swagger
 *
 * /jobs/{id}/responses:
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
      .where('job_id', id)
      .whereNotDeleted()
      .withGraphFetched('[job]')
      .first();

    if (!job_response) {
      return res.json({
        'success': true,
        'message': 'No Job Response found.',
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

module.exports = {
  show,
}
