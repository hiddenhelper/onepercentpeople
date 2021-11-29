import { checkSchema } from 'express-validator';
const BaseController = require('../../../controllers/BaseController');

exports.validatePasswordReset = [

  checkSchema({
    'email': {
      in: ['body'],
      errorMessage: 'Invalid email address',
      trim: {},
      isEmail: {},
      normalizeEmail: {},
    },
  }),

  BaseController.validationResponse,
];
