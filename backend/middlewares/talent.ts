import { Request, Response, NextFunction } from 'express';
const BaseController = require('../controllers/BaseController');
// const { auth } = require('../middlewares/authentication');

/**
 * This middleware checks that the user is logged in and is a talent account.
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const talent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await BaseController.getAuthUser(req);

    if (user && user.isTalent())
      return next();

    if (!user)
      return BaseController.notAuthenticatedResponse(req, res, next);

    return BaseController.notAuthorizedResponse(req, res, next);
  } catch (e) {
    // console.log(e)
    return BaseController.notAuthorizedResponse(req, res, next);
  }
};
