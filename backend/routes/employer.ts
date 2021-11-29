export { };
const { Router } = require('express');
const router = Router();
const os = require('os');
const formData = require("express-form-data");

const JobsController = require('../controllers/employer/JobsController');
const CompanyController = require('../controllers/company/CompanyController');
const JobResponseController = require('../controllers/employer/JobResponseController');
const JobJobResponseController = require('../controllers/employer/JobJobResponseController');
const JobValidator = require('../middlewares/validators/employer/job');
const JobResponseValidator = require('../middlewares/validators/employer/job-response');
const CompanyValidator = require('../middlewares/validators/company');
const { employer } = require('../middlewares/employer');

const options = {
  uploadDir: os.tmpdir(),
};

// router.put('/jobs/:id', employer, JobValidator.update, JobsController.update);
router.get('/jobs/responses', employer, JobResponseValidator.index, JobResponseController.index);
router.get('/jobs/:id/responses', employer, JobResponseValidator.index, JobJobResponseController.index);
router.put('/jobs/:job_id/responses/:id/interested', employer, JobResponseValidator.interested, JobResponseController.markInterested);
router.put('/jobs/:job_id/responses/:id/reject', employer, JobResponseValidator.reject, JobResponseController.markRejected);
router.put('/jobs/:job_id/responses/:id/hire', employer, JobResponseValidator.hire, JobResponseController.hire);
router.get('/jobs/responses/:id', employer, JobResponseValidator.show, JobResponseController.show);

router.get('/jobs', employer, JobValidator.index, JobsController.index);
router.post('/jobs', employer, JobValidator.store, JobsController.store);
router.get('/jobs/:id', employer, JobValidator.show, JobsController.show);
router.put('/jobs/:id', employer, JobValidator.update, JobsController.update);
router.delete('/jobs/:id', employer, JobValidator.destroy, JobsController.destroy);

router.put('/jobs/:id/pause', employer, JobValidator.pause, JobsController.pause);
router.put('/jobs/:id/resume', employer, JobValidator.resume, JobsController.resume);
router.put('/jobs/:id/post', employer, JobValidator.post, JobsController.post);

router.get('/companies', employer, CompanyValidator.index, CompanyController.index);
router.post('/companies', employer, CompanyValidator.store, CompanyController.store);
router.post('/companies/:id/logo', employer, CompanyValidator.storeLogo, formData.parse(options), CompanyController.storeLogo);
router.get('/companies/:id', employer, CompanyValidator.show, CompanyController.show);
router.put('/companies/:id', employer, CompanyValidator.update, CompanyController.update);
router.delete('/companies/:id', employer, CompanyValidator.destroy, CompanyController.destroy);

module.exports = router;
