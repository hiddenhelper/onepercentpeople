import { Request, Response, NextFunction } from 'express';
const Country = require('../models/Country');

/**
 * This route can be used with an uptime checker or for a developer to view.
 * It shows the health of the backend.
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function index(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    // Using countries query to check that the database connection is working.
    const db_record = await Country.query().whereNotDeleted().first();
    let database_connection_status = db_record ? "Connected" : "Failing";

    const data = {
      'database': database_connection_status,
    };

    res.json(data);
  } catch (err) {
    return res.send({
      'error': 'failing',
    });
  }
}

module.exports = {
  index
}
