import { Request, Response, NextFunction } from 'express';
const Currency = require('../models/Currency');

/**
 * Get all currencies.
 *
 * @swagger
 *
 * /currencies:
 *   get:
 *     tags:
 *       - types
 *     produces:
 *       - application/json
 *     parameters:
 *
 * @returns list of currency objects.
 */
async function index(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const currencies = await Currency.query().whereNotDeleted();

    const data = {
      'success': true,
      'currencies': currencies,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

module.exports = {
  index,
}
