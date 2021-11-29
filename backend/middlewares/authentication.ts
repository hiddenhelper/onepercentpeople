import { Request, Response, NextFunction } from 'express';
const BaseController = require('../controllers/BaseController');

/**
 * Checks that the user is logged in.
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await BaseController.getAuthUser(req);

    // if (user)
    return next();

    return BaseController.notAuthorizedResponse(req, res, next);
  } catch (e) {
    // console.log(e)
    return BaseController.notAuthorizedResponse(req, res, next);
  }
};
