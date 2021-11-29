export { };
const { Router } = require('express');
const router = Router();

const HealthController = require('../controllers/HealthController');

router.get('/', HealthController.index);

module.exports = router;
