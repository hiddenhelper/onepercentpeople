import { checkSchema } from 'express-validator';
const BaseController = require('../../../../controllers/BaseController');

exports.update = [

  checkSchema({
    'user.first_name': {
      in: ['body'],
      errorMessage: 'Invalid first name',
      trim: {},
      optional: { options: { nullable: true } },
    },
    'user.last_name': {
      in: ['body'],
      errorMessage: 'Invalid last name',
      trim: {},
      optional: { options: { nullable: true } },
    },
    'user.phone': {
      in: ['body'],
      errorMessage: 'Invalid phone number',
      trim: {},
      isLength: { options: { min: 8, max: 20 } },
      optional: { options: { nullable: true } },
    },
    'user.country_id': {
      in: ['body'],
      errorMessage: 'Invalid country',
      isInt: true,
      toInt: true,
      optional: { options: { nullable: true } },
    },
    'user.city': {
      in: ['body'],
      errorMessage: 'Invalid city',
      trim: {},
      optional: { options: { nullable: true } },
    },
  }),

  BaseController.validationResponse,
];
