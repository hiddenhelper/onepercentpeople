import { checkSchema } from 'express-validator';
const BaseController = require('../../../controllers/BaseController');

exports.validateTalentRegister = [
  checkSchema({
    'first_name': {
      in: ['body'],
      errorMessage: 'Invalid first name',
      trim: {},
    },
    'last_name': {
      in: ['body'],
      errorMessage: 'Invalid last name',
      trim: {},
    },
    'email': {
      in: ['body'],
      errorMessage: 'Invalid email address',
      trim: {},
      isEmail: {},
      normalizeEmail: {},
    },
    'password': {
      in: ['body'],
      errorMessage: 'Invalid password',
      trim: {},
      isLength: { options: { min: 8 } },
    },
    'country_id': {
      in: ['body'],
      errorMessage: 'Invalid country',
      isInt: true,
      toInt: true,
    },
    'city': {
      in: ['body'],
      errorMessage: 'Invalid city',
      trim: {},
    },
  }),

  BaseController.validationResponse,
];
