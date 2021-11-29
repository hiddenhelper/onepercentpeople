import { check } from 'express-validator';
const BaseController = require('../../../controllers/BaseController');

exports.validateLogin = [

  check('email')
    .isEmail()
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage('Invalid email address!')
    .bail(),

  check('password')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Password cannot be empty.')
    .bail()
    .isLength({ min: 8 })
    .withMessage('Passwords must be at least 8 characters.')
    .bail(),

  BaseController.validationResponse,
];
