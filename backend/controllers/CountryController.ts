import { Request, Response, NextFunction } from 'express';
const Country = require('../models/Country');

/**
 * Get all countries.
 *
 * @swagger
 *
 * /countries:
 *   get:
 *     tags:
 *       - types
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: order
 *         in: query
 *         required: true
 *         type: string
 *
 * @returns list of country objects.
 */
async function index(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const countries = await Country.query().whereNotDeleted();

    const data = {
      'success': true,
      'countries': countries,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

module.exports = {
  index,
}
