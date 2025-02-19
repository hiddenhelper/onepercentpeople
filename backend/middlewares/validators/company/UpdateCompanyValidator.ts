import { checkSchema } from 'express-validator';
const BaseController = require('../../../controllers/BaseController');

exports.update = [
  checkSchema({
    'company.id': {
      in: ['body'],
      errorMessage: 'Invalid id',
      isInt: true,
      toInt: true,
      // optional: { options: { nullable: true } },
    },
    'company.name': {
      in: ['body'],
      errorMessage: 'Invalid name',
      trim: {},
      // optional: { options: { nullable: true } },
    },
    'company.description': {
      in: ['body'],
      errorMessage: 'Invalid description',
      trim: {},
      optional: { options: { nullable: true } },
    },
    'company.phone': {
      in: ['body'],
      errorMessage: 'Invalid phone',
      trim: {},
      optional: { options: { nullable: true } },
    },
    'company.url': {
      in: ['body'],
      errorMessage: 'Invalid url',
      trim: {},
      optional: { options: { nullable: true } },
    },
    'company.industry': {
      in: ['body'],
      errorMessage: 'Invalid industry',
      trim: {},
      optional: { options: { nullable: true } },
    },
    'company.logo': {
      in: ['body'],
      errorMessage: 'Invalid logo',
      // trim: {},
      optional: { options: { nullable: true } },
    },
  }),

  BaseController.validationResponse,
];
