import { Request, Response, NextFunction } from 'express';
const User = require('../../models/User');
const BaseController = require('../BaseController');
import { matchedData } from 'express-validator';
import generateHash from 'random-hash';
import { Storage } from '@google-cloud/storage';
const ASSETS_BUCKET = process.env.GCLOUD_STORAGE_BUCKET;

/**
 *
 * @swagger
 *
 * /user:
 *   get:
 *     tags:
 *       - user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: order
 *         in: query
 *         required: true
 *         type: string
 *
 * @returns current User object.
 */
async function index(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const user = await BaseController.getAuthUser(req);

    const data = {
      'success': true,
      'user': user,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Update User.
 *
 * @swagger
 *
 * /user:
 *   put:
 *     tags:
 *       - user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *
 * @returns user object.
 */
async function update(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { user: u } = matchedData(req);
    const user = await BaseController.getAuthUser(req);

    // Only allowing these fields to update.
    let userUpdates = {
      first_name: u.first_name ?? user.first_name,
      last_name: u.last_name ?? user.last_name,
      phone: u.phone ?? user.phone,
      city: u.city ?? user.city,
      country_id: u.country_id ?? user.country_id
    };

    const updatedUser = await User.query()
      .whereNotDeleted()
      .patchAndFetchById(user.id, userUpdates);

    const data = {
      'success': true,
      'user': updatedUser
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Mark the User as finished with onboarding.
 *
 * @swagger
 *
 * /user/finished-onboarding:
 *   put:
 *     tags:
 *       - user
 *     produces:
 *       - application/json
 *
 * @returns user object.
 */
async function markFinishedOnboarding(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const user = await BaseController.getAuthUser(req);

    const updatedUser = await User.query()
      .whereNotDeleted()
      .patchAndFetchById(user.id, { finished_onboarding_at: User.knex().fn.now() });

    const data = {
      'success': true,
      'user': updatedUser
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Uploads user profile image to gcloud storage.
 *
 * @swagger
 *
 * /user/profile-photo:
 *   post:
 *     tags:
 *       - user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: photoFile
 *         in: formData
 *         required: true
 *         type: file
 *
 * @returns user object.
 */
async function storeProfilePhoto(req: any, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const user = await BaseController.getAuthUser(req);
    const { photoFile } = req.files;

    if (photoFile) {
      const storage = new Storage();
      const destination_folder_path = user.uploadsDirectory();
      // Generate unique filename
      const hash = generateHash({ length: 16 });

      let extension;
      extension = photoFile.type === "image/png" ? ".png" : extension;
      extension = photoFile.type === "image/jpeg" ? ".jpg" : extension;

      if (!extension) throw new Error("Invalid file type");

      const file_name = `profile-photo-${hash}${extension}`;

      storage.bucket(ASSETS_BUCKET).upload(
        photoFile.path,
        {
          destination: `${destination_folder_path}${file_name}`,
        }
      );

      const url = `https://storage.googleapis.com/${ASSETS_BUCKET}/${destination_folder_path}${file_name}`;
      const updatedUser = await User.query().where('id', user.id).patchAndFetchById(user.id, { profile_photo_url: url });

      if (updatedUser) {
        const data = {
          'success': true,
          user: updatedUser,
        };

        return res.json(data);
      }
    }

    return res.json({ success: false, mes: "Profile photo was not stored successfully." });
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}


module.exports = {
  index,
  update,
  markFinishedOnboarding,
  storeProfilePhoto,
}
