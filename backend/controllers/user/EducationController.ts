import { Request, Response, NextFunction } from 'express';
const Education = require('../../models/Education');
const BaseController = require('../BaseController');
import { matchedData } from 'express-validator';

/**
 *
 * @swagger
 *
 * /user/education:
 *   get:
 *     tags:
 *       - talent
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: order
 *         in: query
 *         required: true
 *         type: string
 *
 * @returns list of education objects.
 */
async function index(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const user = await BaseController.getAuthUser(req);

    const educations = await Education.query().where('user_id', user.id).whereNotDeleted();

    const data = {
      'success': true,
      'educations': educations,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Get specified Education
 *
 * @swagger
 *
 * /user/education/{id}:
 *   get:
 *     tags:
 *       - talent
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *
 * @returns single education object.
 */
async function show(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {

    const { id } = req.params;
    const user = await BaseController.getAuthUser(req);
    const education = await Education.query().whereNotDeleted().where('user_id', user.id).findById(id);

    if (!education) {
      return res.json({
        'success': true,
        'message': 'Education not found.',
      });
    }

    const data = {
      'success': true,
      'education': education,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Create a new Education.
 *
 * @swagger
 *
 * /user/education:
 *   post:
 *     tags:
 *       - talent
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: education
 *         in: body
 *         required: true
 *         type: Education
 *
 * @returns education object.
 */
async function store(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { education } = matchedData(req);
    const user = await BaseController.getAuthUser(req);
    education.user_id = user.id;
    const createdItem = await Education.query().insertAndFetch(education);
    if (createdItem) {
      const data = {
        'success': true,
        education: createdItem,
      };

      return res.json(data);
    }

    return res.json({ success: false, mes: "Education was not created successfully." });
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Update Education.
 *
 * @swagger
 *
 * /user/education/{id}:
 *   put:
 *     tags:
 *       - talent
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *       - name: education
 *         in: body
 *         required: true
 *         type: Education
 *
 * @returns education object.
 */
async function update(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id } = req.params;
    const { education } = matchedData(req);
    const user = await BaseController.getAuthUser(req);
    education.user_id = user.id;

    const updatedEducation = await Education.query().whereNotDeleted().where('user_id', user.id).patchAndFetchById(id, education);

    const data = {
      'success': true,
      'education': updatedEducation
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Delete Education.
 *
 * @swagger
 *
 * /user/education/{id}:
 *   delete:
 *     tags:
 *       - talent
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *
 * @returns education object.
 */
async function destroy(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id } = req.params;
    const user = await BaseController.getAuthUser(req);
    const deletedEducation = await Education.query().delete().where('user_id', user.id).findById(id);

    const data = {
      'success': true,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}



module.exports = {
  index,
  show,
  store,
  update,
  destroy
}
