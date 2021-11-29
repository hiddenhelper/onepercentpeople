import { checkSchema } from 'express-validator';
const BaseController = require('../../../../controllers/BaseController');

exports.store = [

  checkSchema({
    'education.education_level_id': {
      in: ['body'],
      errorMessage: 'Invalid education level',
      isInt: true,
      toInt: true,
    },
    'education.field_of_study': {
      in: ['body'],
      errorMessage: 'Invalid education level',
      trim: {},
    },
    'education.school_name': {
      in: ['body'],
      errorMessage: 'Invalid school name',
      trim: {},
    },
    'education.country_id': {
      in: ['body'],
      errorMessage: 'Invalid country',
      isInt: true,
      toInt: true,
    },
    'education.city': {
      in: ['body'],
      errorMessage: 'Invalid city',
      trim: {},
    },
    'education.from_month': {
      in: ['body'],
      errorMessage: 'Invalid from month',
      isInt: { options: { min: 1, max: 12 } },
      toInt: true,
    },
    'education.to_month': {
      in: ['body'],
      errorMessage: 'Invalid to month',
      isInt: { options: { min: 1, max: 12 } },
      toInt: true,
    },
    'education.from_year': {
      in: ['body'],
      errorMessage: 'Invalid from year',
      isInt: { options: { min: 1900, max: 2100 } },
      toInt: true,
    },
    'education.to_year': {
      in: ['body'],
      errorMessage: 'Invalid to year',
      isInt: { options: { min: 1900, max: 2100 } },
      toInt: true,
    },

  }),

  BaseController.validationResponse,
];
