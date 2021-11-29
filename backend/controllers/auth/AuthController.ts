import { Request, Response, NextFunction } from 'express';
const { firebaseWeb, firebaseAdmin } = require('../../firebase-config');
const User = require('../../models/User');
import { matchedData } from 'express-validator';

/**
 * @swagger
 *
 * /auth/login:
 *   post:
 *     tags:
 *       - auth
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         in: body
 *         required: true
 *         type: string
 *
 * @returns user object.
 */
async function login(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const firebase = firebaseWeb();
    const admin = firebaseAdmin();
    const { email, password } = matchedData(req)
    const credential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const { user: firebaseUser } = credential;
    const token = await firebaseUser.getIdToken();

    // 14 days experation
    const expiresIn = 60 * 60 * 24 * 14 * 1000;
    // Create the session cookie. This will also verify the ID token in the process.
    // The session cookie will have the same claims as the ID token.
    // To only allow session cookie setting on recent sign-in, auth_time in ID token
    // can be checked to ensure user was recently signed in before creating a session cookie.
    await admin
      .auth()
      .createSessionCookie(token, { expiresIn })
      .then(
        (sessionCookie: any) => {
          // Set cookie policy for session cookie.
          const options = { maxAge: expiresIn, httpOnly: true, secure: true };
          res.cookie('session', sessionCookie, options);
        },
        (error: any) => {
          throw new Error("Unauthorized");
        }
      );

    const user = await User.query().whereNotDeleted().where('email', firebaseUser.email).first();

    return res.json({
      code: 'auth/success',
      user: user,
    });

  } catch (err) {
    console.log(err);
    res.json({ error: err.message, code: err.code });
  }
}

/**
 * This sends a password reset email to the user.
 * If the email doesn't exist, it will not send an email but it will always
 * tell the user that it was successful.
 *
 * @swagger
 *
 * /auth/password-reset:
 *   post:
 *     tags:
 *       - auth
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         in: body
 *         required: true
 *         type: string
 *
 * @returns
 */
async function passwordReset(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const firebase = firebaseWeb();
    const { email } = matchedData(req)
    await firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(
        (response: any) => {
        },
        (error: any) => {
        }
      );

    return res.json({
      code: 'password-reset',
      success: true
    });

  } catch (err) {
    res.json({ error: err.message, code: err.code });
  }
}


module.exports = {
  login,
  passwordReset
}
