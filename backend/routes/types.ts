export { };
const { Router } = require('express');
const router = Router();

const CurrencyController = require('../controllers/CurrencyController');
const CountryController = require('../controllers/CountryController');
const RolesController = require('../controllers/RolesController');
const EducationLevelsController = require('../controllers/EducationLevelsController');

router.get('/currencies', CurrencyController.index);
router.get('/countries', CountryController.index);
router.get('/roles', RolesController.index);
router.get('/education-levels', EducationLevelsController.index);

module.exports = router;
