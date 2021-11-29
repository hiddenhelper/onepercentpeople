import { checkSchema } from 'express-validator';
const BaseController = require('../../../../controllers/BaseController');

exports.reject = [
  checkSchema({
    'job_id': {
      in: ['params'],
      errorMessage: 'Invalid job id',
      isInt: true,
      toInt: true,
    },
    'id': {
      in: ['params'],
      errorMessage: 'Invalid id',
      isInt: true,
      toInt: true,
    },
  }),

  BaseController.validationResponse,
];
