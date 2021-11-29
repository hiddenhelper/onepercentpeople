export { };
const { Router } = require('express');
const router = Router();

const AuthController = require('../controllers/auth/AuthController');
const EmployerAuthController = require('../controllers/auth/EmployerAuthController');
const TalentAuthController = require('../controllers/auth/TalentAuthController');
const { validateLogin } = require('../middlewares/validators/auth/LoginValidator');
const { validatePasswordReset } = require('../middlewares/validators/auth/PasswordResetValidator');
const { validateEmployerRegister } = require('../middlewares/validators/auth/EmployerRegisterValidator');
const { validateTalentRegister } = require('../middlewares/validators/auth/TalentRegisterValidator');


router.post('/login', validateLogin, AuthController.login);
router.post('/password-reset', validatePasswordReset, AuthController.passwordReset);
router.post('/employer/register', validateEmployerRegister, EmployerAuthController.store);
router.post('/talent/register', validateTalentRegister, TalentAuthController.store);

module.exports = router;
