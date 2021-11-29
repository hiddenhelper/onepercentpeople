import { checkSchema } from 'express-validator';
const BaseController = require('../../../../controllers/BaseController');

exports.index = [
  checkSchema({
    'page': {
      in: ['query'],
      errorMessage: 'Invalid page',
      isInt: true,
      toInt: true,
      optional: { options: { nullable: true } },
    },
    'per_page': {
      in: ['query'],
      errorMessage: 'Invalid per page',
      isInt: true,
      toInt: true,
      optional: { options: { nullable: true } },
    },
  }),

  BaseController.validationResponse,
];
