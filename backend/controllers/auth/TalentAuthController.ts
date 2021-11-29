import { Request, Response, NextFunction } from 'express';
import { matchedData } from 'express-validator';
const { firebaseWeb, firebaseAdmin } = require('../../firebase-config');
const User = require('../../models/User');

/**
 *
 * @swagger
 *
 * /auth/talent/register:
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
 *       - name: country_id
 *         in: body
 *         required: true
 *         type: int
 *       - name: city
 *         in: body
 *         required: true
 *         type: string
 *
 * @returns user object.
 */
async function store(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { email, password, first_name, last_name, country_id, city } = matchedData(req);
    const firebase = firebaseWeb();
    const admin = firebaseAdmin();
    const credential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const { user: firebaseUser } = credential;
    const token = await firebaseUser.getIdToken();

    const user = await User.fromJson({ firebase_uid: firebaseUser.uid, first_name: first_name, last_name: last_name, email: email, account_type: 1, country_id: country_id, city: city })
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
