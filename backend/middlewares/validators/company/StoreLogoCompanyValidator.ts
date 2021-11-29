import { checkSchema } from 'express-validator';
const BaseController = require('../../../controllers/BaseController');

exports.storeLogo = [
  checkSchema({
    'logoFile': {
      in: ['body'],
      errorMessage: 'Invalid logo file',
    },
  }),

  BaseController.validationResponse,
];
