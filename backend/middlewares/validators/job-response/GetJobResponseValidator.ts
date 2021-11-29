import { check } from 'express-validator';
const BaseController = require('../../../controllers/BaseController');

exports.index = [

  // check('order')
  //   .withMessage('Order must be asc or desc.')
  //   .bail(),

  BaseController.validationResponse,
];
