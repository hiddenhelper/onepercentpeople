import { check } from 'express-validator';
const BaseController = require('../../../../controllers/BaseController');

exports.index = [
  BaseController.validationResponse,
];
