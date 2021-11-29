import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
const { firebaseAdmin } = require('../firebase-config');
const User = require('../models/User');

/**
 * This checks that the request has a JWT token set in the authorization header,
 * it uses the token to verify against Firebase and then
 * uses the firebase uid to grab the user from the database
 *
 * @param req
 * @returns User
 */
async function getAuthUser(req: Request) {
  try {
    const sessionCookie = req.cookies.session || '';

    const firebase = firebaseAdmin();
    const firebaseUser = await firebase.auth()
      .verifySessionCookie(sessionCookie, true)
      .then((firebaseUser: object) => {
        return firebaseUser;
      })
      .catch((error) => {
        console.log('Firebase auth error');
        console.log(error);
        return null;
      });

    if (!firebaseUser) return null;

    const { uid } = firebaseUser;

    const user = await User.query().where('firebase_uid', uid).whereNotDeleted().first();

    if (user)
      return user;
  } catch (err) {
    return null;
  }
}

/**
 *  This is the base response for all validation middleware.
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function validationResponse(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.array() });
  next();
}

/**
 *  This is the base response for all validation middleware.
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function notAuthorizedResponse(req: Request, res: Response, next: NextFunction) {
  return res
    .status(401)
    .send({ error: 'You are not authorized to make this request,' });
}

/**
 *  This is the base response for all validation middleware.
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function notAuthenticatedResponse(req: Request, res: Response, next: NextFunction) {
  return res
    .status(401)
    .send({ error: 'You need to be logged in to do that.', action: 'logout' });
}

module.exports = {
  getAuthUser,
  validationResponse,
  notAuthorizedResponse,
  notAuthenticatedResponse
}
