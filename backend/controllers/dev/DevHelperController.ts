import { Request, Response, NextFunction } from 'express';

async function about(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const data = {
      'success': true,
      'controller': 'DevHelperController',
      'DEV_TEST_1': process.env.DEV_TEST_1 ?? 'not found',
      'build': process.env.DEV_TEST_2 ?? 'not found',
      'node_version': process.version,
      // 'process_versions': process.versions,
    };
    res.json(data);
  } catch (err) {
    return res.send(err);
  }
}

module.exports = {
  about
}
