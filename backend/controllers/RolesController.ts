import { Request, Response, NextFunction } from 'express';
const Role = require('../models/Role');

/**
 *
 * @swagger
 *
 * /roles:
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
 * @returns list of currency objects.
 */
async function index(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const roles = await Role.query().whereNotDeleted();

    const data = {
      'success': true,
      'roles': roles,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

module.exports = {
  index,
}
