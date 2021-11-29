import { Request, Response, NextFunction } from 'express';
const BaseController = require('../BaseController');
const Resume = require('../../models/Resume');
import generateHash from 'random-hash';
import { Storage } from '@google-cloud/storage';

const ASSETS_BUCKET = process.env.GCLOUD_STORAGE_BUCKET;

/**
 * @swagger
 *
 * /user/resumes:
 *   get:
 *     tags:
 *       - resume
 *     produces:
 *       - application/json
 *
 * @returns list of resume objects belonging to the current user.
 */
async function index(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {

    const user = await BaseController.getAuthUser(req);
    const resumes = await Resume.query().where('user_id', user.id).whereNotDeleted();

    const data = {
      'success': true,
      'resumes': resumes,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Get specified Resume
 *
 * @swagger
 *
 * /user/resumes:
 *   get:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *
 * @returns single resume object.
 */
async function show(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id } = req.params;
    const user = await BaseController.getAuthUser(req);
    const resume = await Resume.query().whereNotDeleted().where('user_id', user.id).findById(id);

    if (!resume) {
      return res.json({
        'success': true,
        'message': 'Resume not found.',
      });
    }

    const data = {
      'success': true,
      'resume': resume
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Create a new Resume.
 *
 * @swagger
 *
 * /user/resumes:
 *   post:
 *     tags:
 *       - resume
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: resume
 *         in: formData
 *         required: true
 *         type: file
 *
 * @returns resume object.
 */
async function store(req: any, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const user = await BaseController.getAuthUser(req);
    const file = req.files.resumeFile;
    const title = file.originalFilename ?? "";
    const file_ext = file.path.substring(file.path.lastIndexOf('.') + 1);
    const destination_folder_path = user.uploadsDirectory();
    // Generate unique filename
    const hash = generateHash({ length: 16 });
    const file_name = `resume-${hash}.${file_ext}`;

    const storage = new Storage();
    storage.bucket(ASSETS_BUCKET).upload(
      file.path,
      {
        destination: `${destination_folder_path}${file_name}`,
      }
    );

    const resume = await Resume.query().insert({
      user_id: user.id,
      url: `https://storage.googleapis.com/${ASSETS_BUCKET}/${destination_folder_path}${file_name}`,
      file_name: file_name,
      file_type: file_ext,
      title: title,
    });


    const data = {
      'success': true,
      'resume': resume
    };

    res.json(data);
  } catch (err) {
    console.error(err);
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Update Resume.
 *
 * @swagger
 *
 * /user/resumes:
 *   put:
 *     tags:
 *       - resume
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *
 *
 * @returns resume object.
 */
async function update(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {

    const data = {
      'success': true,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Delete the Resume.
 *
 * @swagger
 *
 * /user/resumes:
 *   delete:
 *     tags:
 *       - resume
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         type: integer
 *
 *
 * @returns boolean
 */
async function destroy(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id } = req.params;
    const user = await BaseController.getAuthUser(req);
    const deletedResume = await Resume.query().delete().where('user_id', user.id).findById(id);
    // TODO: remove from google cloud storage?
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
