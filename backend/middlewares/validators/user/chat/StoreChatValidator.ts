import { checkSchema } from 'express-validator';
const BaseController = require('../../../../controllers/BaseController');

exports.store = [
  checkSchema({
    'chat.employer_user_id': {
      in: ['body'],
      errorMessage: 'Invalid employer id',
      isInt: true,
      toInt: true,
    },
    'chat.talent_user_id': {
      in: ['body'],
      errorMessage: 'Invalid talent id',
      isInt: true,
      toInt: true,
    },
  }),

  BaseController.validationResponse,
];
