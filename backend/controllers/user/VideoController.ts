import { Request, Response, NextFunction } from 'express';
const BaseController = require('../BaseController');
const User = require('../../models/User');
const Video = require('../../models/Video');
const os = require('os');
import generateHash from 'random-hash';
import { Storage } from '@google-cloud/storage';

const ASSETS_BUCKET = process.env.GCLOUD_STORAGE_BUCKET;

const hbjs = require('handbrake-js');


/**
 * @swagger
 *
 * /user/videos:
 *   get:
 *     tags:
 *       - video
 *     produces:
 *       - application/json
 *
 * @returns list of video objects belonging to the current user.
 */
async function index(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {

    const user = await BaseController.getAuthUser(req);
    const videos = await Video.query().where('user_id', user.id).whereNotDeleted();

    const data = {
      'success': true,
      'videos': videos,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Get specified Video
 *
 * @swagger
 *
 * /user/videos:
 *   get:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *
 * @returns single video object.
 */
async function show(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const { id } = req.params;
    const user = await BaseController.getAuthUser(req);
    const video = await Video.query().whereNotDeleted().where('user_id', user.id).findById(id);

    if (!video) {
      return res.json({
        'success': true,
        'message': 'Video not found.',
      });
    }

    const data = {
      'success': true,
      video: video
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Create a new Video.
 *
 * @swagger
 *
 * /user/videos:
 *   post:
 *     tags:
 *       - video
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: video
 *         in: formData
 *         required: true
 *         type: file
 *
 * @returns video object.
 */
async function store(req: any, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const user = await BaseController.getAuthUser(req);
    const file = req.files.videoFile;
    const { title } = req.body;

    const destination_folder_path = user.uploadsDirectory();
    // Generate unique filename
    const hash = generateHash({ length: 16 });
    const file_name = `video-${hash}.mp4`;

    const newFileName = `${os.tmpdir()}/${file_name}`;

    const options = {
      input: file.path,
      output: newFileName,
      preset: "Very Fast 1080p30"
    };

    await hbjs.spawn(options)
      .on('error', error => {
        console.error("Error in handbrake on video upload.");
        console.error(error);
        throw new Error("Error encoding video.");
      })
      // .on('output', console.log)
      .on('complete', async () => {
        const storage = new Storage();

        storage.bucket(ASSETS_BUCKET).upload(
          newFileName,
          {
            destination: `${destination_folder_path}${file_name}`,
          }
        );
      });

    const video = await Video.query().insert({
      user_id: user.id,
      url: `https://storage.googleapis.com/${ASSETS_BUCKET}/${destination_folder_path}${file_name}`,
      file_name: file_name,
      file_type: 'mp4',
      title: title,
    });


    const data = {
      'success': true,
      video: video
    };

    res.json(data);
  } catch (err) {
    console.error(err);
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Update Video.
 *
 * @swagger
 *
 * /user/videos:
 *   put:
 *     tags:
 *       - video
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: integer
 *
 *
 * @returns video object.
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
 * Delete the Video.
 *
 * @swagger
 *
 * /user/videos:
 *   delete:
 *     tags:
 *       - video
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
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
    const deletedVideo = await Video.query().delete().where('user_id', user.id).findById(id);
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
