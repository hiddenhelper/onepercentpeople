import { checkSchema } from 'express-validator';
const BaseController = require('../../../controllers/BaseController');

exports.show = [
  checkSchema({
    'id': {
      in: ['params'],
      errorMessage: 'Invalid id',
      isInt: true,
      toInt: true,
    },
  }),

  BaseController.validationResponse,
];
