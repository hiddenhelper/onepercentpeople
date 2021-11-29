export { };
const { Router } = require('express');
const router = Router();
const DevHelperController = require('../controllers/dev/DevHelperController');

router.get('/about', DevHelperController.about);

module.exports = router;
