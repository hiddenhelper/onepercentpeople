import { Request, Response, NextFunction } from 'express';
import { matchedData } from 'express-validator';
const { firebaseWeb, firebaseAdmin } = require('../../firebase-config');
const User = require('../../models/User');

/**
 * Register/create new employer user.
 *
 * @swagger
 *
 * /auth/employer/register:
 *   post:
 *     tags:
 *       - auth
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: first_name
 *         in: body
 *         required: true
 *         type: string
 *       - name: last_name
 *         in: body
 *         required: true
 *         type: string
 *       - name: email
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         in: body
 *         required: true
 *         type: string
 *       - name: phone
 *         in: body
 *         required: true
 *         type: string
 *
 * @returns user object.
 */
async function store(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { email, password, first_name, last_name, phone } = matchedData(req);
    const firebase = firebaseWeb();
    const admin = firebaseAdmin();
    const credential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const { user: firebaseUser } = credential;
    const token = await firebaseUser.getIdToken();


    const user = await User.fromJson({ firebase_uid: firebaseUser.uid, first_name: first_name, last_name: last_name, email: email, phone: phone, account_type: 2 })
      .$query()
      .insert();

    // 14 days experation
    const expiresIn = 60 * 60 * 24 * 14 * 1000;

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

    return res.json({
      code: 'auth/success',
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.json({ error: err.message, code: err.code });
  }
}

module.exports = {
  store,
}
