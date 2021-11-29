import { Request, Response, NextFunction } from 'express';
const Chat = require('../../models/Chat');
const BaseController = require('../BaseController');
import { matchedData } from 'express-validator';

/**
 * Get a list of all chat objectives
 *
 * @swagger
 *
 * /user/chats:
 *   get:
 *     tags:
 *       - chat
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: talent_user_id
 *         in: query
 *         required: false
 *         type: string
 *       - name: page
 *         in: query
 *         required: false
 *         type: string
 *       - name: per_page
 *         in: query
 *         required: false
 *         type: string
 *
 * @returns list of chat objects.
 */
async function index(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    const user = await BaseController.getAuthUser(req);

    let { talent_user_id, page = 0, per_page = 100 } = matchedData(req);

    const chats = await Chat
      .query()
      .where('employer_user_id', user.id)
      .withGraphFetched('[talent_user, employer_user]')
      .modify('userMessages', user)
      .modify('talentUserFilter', talent_user_id)
      .page(page, per_page);

    const data = {
      success: true,
      chats: chats.results,
      total: chats.total,
    };

    res.json(data);
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}

/**
 * Create a new Chat.
 *
 * @swagger
 *
 * /user/chats:
 *   post:
 *     tags:
 *       - chat
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: chat
 *         in: body
 *         required: true
 *         type: string
 *
 * @returns chat object.
 */
async function store(req: Request, res: Response, next: NextFunction): Promise<void | any> {
  try {
    let { chat } = matchedData(req);

    const user = await BaseController.getAuthUser(req);

    if (user.isEmployer())
      chat.employer_user_id = user.id;
    else if (user.isTalent())
      chat.talent_user_id = user.id;
    else
      throw new Error("No valid current user found.");

    const createdItem = await Chat.query().insertAndFetch(chat);
    if (createdItem) {
      const data = {
        'success': true,
        chat: createdItem,
      };

      return res.json(data);
    }

    return res.json({ success: false, mes: "Chat was not created successfully." });
  } catch (err) {
    res.json({ err: err, mes: "there was an error" });
  }
}



module.exports = {
  index,
  store,
}
