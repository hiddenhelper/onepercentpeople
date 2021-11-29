import { checkSchema } from 'express-validator';
const BaseController = require('../../../controllers/BaseController');

exports.store = [
  checkSchema({
    'job_response.job_id': {
      in: ['body'],
      errorMessage: 'Invalid job id',
      isInt: true,
      toInt: true,
    },
  }),

  BaseController.validationResponse,
];
