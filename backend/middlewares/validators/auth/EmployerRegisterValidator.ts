import { check, checkSchema } from 'express-validator';
const BaseController = require('../../../controllers/BaseController');

exports.validateEmployerRegister = [

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
    'phone': {
      in: ['body'],
      errorMessage: 'Invalid phone number',
      trim: {},
      isLength: { options: { min: 8, max: 20 } },
    },
  }),

  BaseController.validationResponse,
];
