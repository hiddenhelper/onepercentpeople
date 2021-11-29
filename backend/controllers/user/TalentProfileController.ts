import { Request, Response, NextFunction } from 'express';
const TalentProfile = require('../../models/TalentProfile');
const BaseController = require('../BaseController');
import { matchedData } from 'express-validator';

/**
 *
 * @swagger
 *
 * /user/talent-profiles:
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
 * @returns list of talent-profile objects.
 */
async function index(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const user = await BaseController.getAuthUser(req);

    const talent_profiles = await TalentProfile.query()
      .withGraphFetched('[expected_salary]')
      .where('user_id', user.id)
      .whereNotDeleted();

    const data = {
      'success': true,
      'talent_profiles': talent_profiles,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Get specified TalentProfile
 *
 * @swagger
 *
 * /user/talent-profiles/{id}:
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
 * @returns single talent-profile object.
 */
async function show(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {

    const { id } = req.params;
    const user = await BaseController.getAuthUser(req);
    const talent_profile = await TalentProfile.query()
      .withGraphFetched('[expected_salary]')
      .whereNotDeleted()
      .where('user_id', user.id)
      .findById(id);

    if (!talent_profile) {
      return res.json({
        'success': true,
        'message': 'TalentProfile not found.',
      });
    }

    const data = {
      'success': true,
      'talent_profile': talent_profile,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Create a new TalentProfile.
 *
 * @swagger
 *
 * /user/talent-profiles:
 *   post:
 *     tags:
 *       - talent
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: talent_profile
 *         in: body
 *         required: true
 *         type: TalentProfile
 *
 * @returns talent-profile object.
 */
async function store(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    let { talent_profile } = matchedData(req);

    // If no data is passed, create a blank object
    if (!talent_profile)
      talent_profile = {};

    const user = await BaseController.getAuthUser(req);
    talent_profile.user_id = user.id;

    const createdItem = await TalentProfile.query().insertAndFetch(talent_profile);
    if (createdItem) {
      const data = {
        'success': true,
        talent_profile: createdItem,
      };

      return res.json(data);
    }

    return res.json({ success: false, mes: "TalentProfile was not created successfully." });
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Update TalentProfile.
 *
 * @swagger
 *
 * /user/talent-profiles/{id}:
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
 *       - name: talent_profile
 *         in: body
 *         required: true
 *         type: TalentProfile
 *
 * @returns talent-profile object.
 */
async function update(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id } = req.params;
    const { talent_profile } = matchedData(req);
    const user = await BaseController.getAuthUser(req);
    talent_profile.user_id = user.id;

    const updatedTalentProfile = await TalentProfile.query().whereNotDeleted().where('user_id', user.id).patchAndFetchById(id, talent_profile);

    // Insert or update related salary.
    if (talent_profile.expected_salary) {
      if (updatedTalentProfile.expected_salary_id) {
        const salary = await TalentProfile.relatedQuery('expected_salary')
          .for(id)
          .patch(talent_profile.expected_salary);
      } else {
        const salary = await TalentProfile.relatedQuery('expected_salary')
          .for(id)
          .insert(talent_profile.expected_salary);
        talent_profile.expected_salary_id = salary.id;
      }
    }

    const data = {
      'success': true,
      'talent_profile': updatedTalentProfile
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Delete TalentProfile.
 *
 * @swagger
 *
 * /user/talent-profiles:
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
 * @returns talent-profile object.
 */
async function destroy(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id } = req.params;
    const user = await BaseController.getAuthUser(req);
    const deletedTalentProfile = await TalentProfile.query().delete().where('user_id', user.id).findById(id);

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
  destroy,
}
