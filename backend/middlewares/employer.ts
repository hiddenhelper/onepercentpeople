import { Request, Response, NextFunction } from 'express';
const BaseController = require('../controllers/BaseController');

/**
 * This middleware checks that the user is logged in and is an employer.
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const employer = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const user = await BaseController.getAuthUser(req);

    if (user && user.isEmployer())
      return next();

    if (!user)
      return BaseController.notAuthenticatedResponse(req, res, next);

    return BaseController.notAuthorizedResponse(req, res, next);
  } catch (e) {
    // console.log(e)
    return BaseController.notAuthorizedResponse(req, res, next);
  }
};
