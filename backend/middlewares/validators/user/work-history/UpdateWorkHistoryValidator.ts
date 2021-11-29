import { checkSchema } from 'express-validator';
const BaseController = require('../../../../controllers/BaseController');

exports.update = [

  checkSchema({
    'work_history.job_title': {
      in: ['body'],
      errorMessage: 'Invalid job title',
      trim: {},
    },
    'work_history.company': {
      in: ['body'],
      errorMessage: 'Invalid education level',
      trim: {},
    },
    'work_history.country_id': {
      in: ['body'],
      errorMessage: 'Invalid country id',
      isInt: true,
      toInt: true,
    },
    'work_history.city': {
      in: ['body'],
      errorMessage: 'Invalid city name',
      trim: {},
    },
    'work_history.from_month': {
      in: ['body'],
      errorMessage: 'Invalid from month',
      isInt: { options: { min: 1, max: 12 } },
      toInt: true,
    },
    'work_history.to_month': {
      in: ['body'],
      errorMessage: 'Invalid to month',
      isInt: { options: { min: 1, max: 12 } },
      toInt: true,
    },
    'work_history.from_year': {
      in: ['body'],
      errorMessage: 'Invalid from year',
      isInt: { options: { min: 1900, max: 2100 } },
      toInt: true,
    },
    'work_history.to_year': {
      in: ['body'],
      errorMessage: 'Invalid to year',
      isInt: { options: { min: 1900, max: 2100 } },
      toInt: true,
    },
    'work_history.current_employment': {
      in: ['body'],
      errorMessage: 'Invalid to current emplyment value',
      isInt: { options: { min: 0, max: 1 } },
      toInt: true,
    },
    'work_history.description': {
      in: ['body'],
      errorMessage: 'Invalid description',
      trim: {},
    },
  }),

  BaseController.validationResponse,
];
