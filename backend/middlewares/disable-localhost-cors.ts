

import { Request, Response, NextFunction } from 'express';
const BaseController = require('../controllers/BaseController');

/**
 * This middleware disables CORS for developers.
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const disableLocalhostCORS = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (process.env.NODE_ENV !== 'development') {
      return next();
    }
    // console.log("Disabling cors");
    const origin = req.get('origin');
    //check if you want to allow this origin
    //if you want to allow it,
    res.set('Access-Control-Allow-Origin', origin);
    // else do not set the header or set it something else
    // res.set('Access-Control-Allow-Origin', 'localhost');
    // res.set('Access-Control-Allow-Origin', '*');


    return next();
  } catch (e) {
    // console.log(e)
    return BaseController.notAuthorizedResponse(req, res, next);
  }
};
