export { };
const { Router } = require('express');
const router = Router();
const os = require('os');
const formData = require("express-form-data");
const { talent } = require('../middlewares/talent');
const VideoController = require('../controllers/user/VideoController');
const ResumeController = require('../controllers/user/ResumeController');
const EducationController = require('../controllers/user/EducationController');
const WorkHistoryController = require('../controllers/user/WorkHistoryController');
const TalentProfileController = require('../controllers/user/TalentProfileController');
const UserController = require('../controllers/user/UserController');
const ChatsController = require('../controllers/user/ChatsController');
const UserValidator = require('../middlewares/validators/user/user');
const EducationValidator = require('../middlewares/validators/user/education');
const WorkHistoryValidator = require('../middlewares/validators/user/work-history');
const TalentProfileValidator = require('../middlewares/validators/user/talent-profile');
const ChatValidator = require('../middlewares/validators/user/chat');


const options = {
  uploadDir: os.tmpdir(),
  autoClean: false
};

router.get('/videos', VideoController.index);
router.get('/videos/:id', VideoController.show);
router.post('/videos', formData.parse(options), VideoController.store);
router.delete('/videos/:id', VideoController.destroy);

router.get('/resumes', ResumeController.index);
router.get('/resumes/:id', ResumeController.show);
router.post('/resumes', formData.parse(options), ResumeController.store);
router.delete('/resumes/:id', ResumeController.destroy);

router.get('/education', talent, EducationValidator.index, EducationController.index);
router.get('/education/:id', talent, EducationValidator.show, EducationController.show);
router.post('/education', talent, EducationValidator.store, EducationController.store);
router.put('/education/:id', talent, EducationValidator.update, EducationController.update);
router.delete('/education', talent, EducationValidator.destroy, EducationController.destroy);

router.get('/work-history', WorkHistoryValidator.index, WorkHistoryController.index);
router.get('/work-history/:id', WorkHistoryValidator.show, WorkHistoryController.show);
router.post('/work-history', WorkHistoryValidator.store, WorkHistoryController.store);
router.put('/work-history/:id', WorkHistoryValidator.update, WorkHistoryController.update);
router.delete('/work-history', WorkHistoryValidator.destroy, WorkHistoryController.destroy);

router.get('/talent-profiles', talent, TalentProfileValidator.index, TalentProfileController.index);
router.get('/talent-profiles/:id', talent, TalentProfileValidator.show, TalentProfileController.show);
router.post('/talent-profiles', talent, TalentProfileValidator.store, TalentProfileController.store);
router.put('/talent-profiles/:id', talent, TalentProfileValidator.update, TalentProfileController.update);
router.delete('/talent-profiles', TalentProfileValidator.destroy, TalentProfileController.destroy);

router.get('/', UserController.index);
router.put('/', UserValidator.update, UserController.update);
router.put('/finished-onboarding', UserController.markFinishedOnboarding);
router.post('/profile-photo', UserValidator.storeProfilePhoto, formData.parse(options), UserController.storeProfilePhoto);

router.get('/chats', ChatValidator.index, ChatsController.index);
router.post('/chats', ChatValidator.store, ChatsController.store);

module.exports = router;
