export { };
const { Router } = require('express');
const router = Router();
const EmployerConnectController = require('../controllers/stripe/EmployerConnectController');
const PlaidController = require('../controllers/plaid/PlaidController');

router.post('/stripe/connect/employer', EmployerConnectController.store);

router.post('/plaid/connect', PlaidController.store);

module.exports = router;
