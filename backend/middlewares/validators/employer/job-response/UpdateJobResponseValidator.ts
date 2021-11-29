import { checkSchema } from 'express-validator';
const BaseController = require('../../../../controllers/BaseController');

exports.update = [
  checkSchema(
    {
      'id': {
        in: ['query'],
        errorMessage: 'Invalid id',
        isInt: true,
        toInt: true,
      },
      'job_response.employer_review_status': {
        in: ['body'],
        errorMessage: 'Invalid employer review status',
        isInt: { options: { min: 0, max: 2 } },
        toInt: true,
      },
    }
  ),

  BaseController.validationResponse,
];
