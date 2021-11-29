import { checkSchema } from 'express-validator';
const BaseController = require('../../../../controllers/BaseController');

exports.storeProfilePhoto = [
  checkSchema({
    'profilePhotoFile': {
      in: ['body'],
      errorMessage: 'Invalid profile photo file',
    },
  }),

  BaseController.validationResponse,
];
