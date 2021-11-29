import { Request, Response, NextFunction } from 'express';
const EducationLevel = require('../models/EducationLevel');

/**
 * Get all education levels.
 *
 * @swagger
 *
 * /education-levels:
 *   get:
 *     tags:
 *       - types
 *     produces:
 *       - application/json
 *     parameters:
 *
 * @returns list of education level objects.
 */
async function index(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const education_levels = await EducationLevel.query().whereNotDeleted();

    const data = {
      'success': true,
      'education_levels': education_levels,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

module.exports = {
  index,
}
