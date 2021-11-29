import { checkSchema } from 'express-validator';
const BaseController = require('../../../../controllers/BaseController');

exports.update = [

  checkSchema({
    'talent_profile.bio': {
      in: ['body'],
      errorMessage: 'Invalid bio',
      trim: {},
      optional: { options: { nullable: true } },
    },
    'talent_profile.english_proficiency_id': {
      in: ['body'],
      errorMessage: 'Invalid english proficiency id',
      isInt: true,
      toInt: true,
      optional: { options: { nullable: true } },
    },
    'talent_profile.employment_type_preference_id': {
      in: ['body'],
      errorMessage: 'Invalid english proficiency id',
      isInt: true,
      toInt: true,
      optional: { options: { nullable: true } },
    },
    'talent_profile.location_id': {
      in: ['body'],
      errorMessage: 'Invalid location id',
      isInt: true,
      toInt: true,
      optional: { options: { nullable: true } },
    },

    'talent_profile.expected_salary.min': {
      in: ['body'],
      errorMessage: 'Invalid salary min',
      // isInt: true,
      // toInt: true,
      optional: { options: { nullable: true } },
    },
    'talent_profile.expected_salary.max': {
      in: ['body'],
      errorMessage: 'Invalid salary max',
      // isInt: true,
      // toInt: true,
      optional: { options: { nullable: true } },
    },
    'talent_profile.expected_salary.period': {
      in: ['body'],
      errorMessage: 'Invalid salary period',
      // isInt: true,
      // toInt: true,
      optional: { options: { nullable: true } },
    },
    'talent_profile.expected_salary.currency_id': {
      in: ['body'],
      errorMessage: 'Invalid salary currency',
      // isInt: true,
      // toInt: true,
      optional: { options: { nullable: true } },
    },
  }),

  BaseController.validationResponse,
];
