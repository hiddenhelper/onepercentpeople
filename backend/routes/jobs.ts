export { };
const { Router } = require('express');
const router = Router();
const { talent } = require('../middlewares/talent');
const JobsController = require('../controllers/JobsController');
const JobResponseController = require('../controllers/JobResponseController');
const JobJobResponseController = require('../controllers/JobJobResponseController');
const JobResponseValidator = require('../middlewares/validators/job-response')

// TODO: add job validators
router.get('/jobs', JobsController.index);
router.get('/jobs/:id', JobsController.show);
router.get('/jobs/:id/responses', talent, JobJobResponseController.show);
router.post('/jobs/:id/responses', talent, JobResponseValidator.store, JobResponseController.store);
router.get('/jobs/responses', talent, JobResponseValidator.index, JobResponseController.index);
router.get('/jobs/responses/:id', talent, JobResponseValidator.show, JobResponseController.show);

module.exports = router;
