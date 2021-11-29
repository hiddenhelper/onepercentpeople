import { checkSchema } from 'express-validator';
const BaseController = require('../../../../controllers/BaseController');

exports.store = [

  checkSchema({
    'job.title': {
      in: ['body'],
      errorMessage: 'Invalid job title',
      trim: {},
    },
    'job.description': {
      in: ['body'],
      errorMessage: 'Invalid education level',
      trim: {},
    },
    'job.role_id': {
      in: ['body'],
      errorMessage: 'Invalid role',
      isInt: true,
      toInt: true,
    },
    'job.company_id': {
      in: ['body'],
      errorMessage: 'Invalid company id',
      isInt: true,
      toInt: true,
      optional: { options: { nullable: true } },
    },
    'job.num_hires_wanted': {
      in: ['body'],
      errorMessage: 'Invalid number of hires',
      isInt: true,
      toInt: true,
      optional: { options: { nullable: true } },
    },
    'job.employment_type_id': {
      in: ['body'],
      errorMessage: 'Invalid employment type',
      isInt: true,
      toInt: true,
    },
    'job.urgency_id': {
      in: ['body'],
      errorMessage: 'Invalid urgency id',
      isInt: true,
      toInt: true,
      optional: { options: { nullable: true } },
    },
    'job.salary_period': {
      in: ['body'],
      errorMessage: 'Invalid salary period',
      trim: {},
    },
    'job.min_salary': {
      in: ['body'],
      errorMessage: 'Invalid salary min',
      trim: {},
    },
    'job.max_salary': {
      in: ['body'],
      errorMessage: 'Invalid salary max',
      trim: {},
    },
    'job.salary_currency_id': {
      in: ['body'],
      errorMessage: 'Invalid currency id',
      isInt: true,
      toInt: true,
    },
    'options.draft': {
      in: ['body'],
      errorMessage: 'Invalid draft value',
      isBoolean: true,
    },
  }),

  BaseController.validationResponse,
];
