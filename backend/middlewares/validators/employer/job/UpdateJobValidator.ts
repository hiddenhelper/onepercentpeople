import { checkSchema } from 'express-validator';
const BaseController = require('../../../../controllers/BaseController');

exports.update = [

  checkSchema({
    'job.title': {
      in: ['body'],
      errorMessage: 'Invalid job title',
      trim: {},
      optional: { options: { nullable: true } },
    },
    'job.description': {
      in: ['body'],
      errorMessage: 'Invalid education level',
      trim: {},
      optional: { options: { nullable: true } },
    },
    'job.role_id': {
      in: ['body'],
      errorMessage: 'Invalid role',
      trim: {},
      optional: { options: { nullable: true } },
    },
    'job.company_id': {
      in: ['body'],
      errorMessage: 'Invalid country',
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
      optional: { options: { nullable: true } },
    },
    'job.urgency_id': {
      in: ['body'],
      errorMessage: 'Invalid to urgency',
      isInt: true,
      toInt: true,
      optional: { options: { nullable: true } },
    },
    'job.salary_period': {
      in: ['body'],
      errorMessage: 'Invalid salary period',
      trim: {},
      optional: { options: { nullable: true } },
    },
    'job.min_salary': {
      in: ['body'],
      errorMessage: 'Invalid salary min',
      trim: {},
      optional: { options: { nullable: true } },
    },
    'job.max_salary': {
      in: ['body'],
      errorMessage: 'Invalid salary max',
      trim: {},
      optional: { options: { nullable: true } },
    },
    'job.salary_currency_id': {
      in: ['body'],
      errorMessage: 'Invalid to currency',
      isInt: true,
      toInt: true,
      optional: { options: { nullable: true } },
    },
  }),

  BaseController.validationResponse,
];
