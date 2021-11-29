import { Request, Response, NextFunction } from 'express';
const WorkHistory = require('../../models/WorkHistory');
const BaseController = require('../BaseController');
import { matchedData } from 'express-validator';

/**
 *
 * @swagger
 *
 * /user/work-history:
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
 * @returns list of WorkHistory objects.
 */
async function index(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const user = await BaseController.getAuthUser(req);

    const work_history = await WorkHistory.query().where('user_id', user.id).whereNotDeleted();

    const data = {
      'success': true,
      'work_history': work_history,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Get specified WorkHistory
 *
 * @swagger
 *
 * /user/work-history/{id}:
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
 * @returns single WorkHistory object.
 */
async function show(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {

    const { id } = req.params;
    const user = await BaseController.getAuthUser(req);
    const work_history = await WorkHistory.query().whereNotDeleted().where('user_id', user.id).findById(id);

    if (!work_history) {
      return res.json({
        'success': true,
        'message': 'WorkHistory not found.',
      });
    }

    const data = {
      'success': true,
      'work_history': work_history,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Create a new WorkHistory.
 *
 * @swagger
 *
 * /user/work-history:
 *   post:
 *     tags:
 *       - talent
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: work_history
 *         in: body
 *         required: true
 *         type: WorkHistory
 *
 * @returns WorkHistory object.
 */
async function store(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { work_history } = matchedData(req);
    const user = await BaseController.getAuthUser(req);
    work_history.user_id = user.id;
    const createdItem = await WorkHistory.query().insertAndFetch(work_history);
    if (createdItem) {
      const data = {
        'success': true,
        work_history: createdItem,
      };

      return res.json(data);
    }

    return res.json({ success: false, mes: "WorkHistory was not created successfully." });
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Update WorkHistory.
 *
 * @swagger
 *
 * /user/work-history/{id}:
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
 *       - name: work_history
 *         in: body
 *         required: true
 *         type: WorkHistory
 * @returns WorkHistory object.
 */
async function update(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id } = req.params;
    const { work_history } = matchedData(req);
    const user = await BaseController.getAuthUser(req);
    work_history.user_id = user.id;

    const updatedWorkHistory = await WorkHistory.query().whereNotDeleted().where('user_id', user.id).patchAndFetchById(id, work_history);

    const data = {
      'success': true,
      'work_history': updatedWorkHistory
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Delete WorkHistory.
 *
 * @swagger
 *
 * /user/work-history/{id}:
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
 * @returns WorkHistory object.
 */
async function destroy(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id } = req.params;
    const user = await BaseController.getAuthUser(req);
    const deletedWorkHistory = await WorkHistory.query().delete().where('user_id', user.id).findById(id);

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
