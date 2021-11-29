import { check } from 'express-validator';
const BaseController = require('../../../../controllers/BaseController');

exports.destroy = [

  check('id')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Invalid id.')
    .bail(),

  BaseController.validationResponse,
];
