const { Router } = require('express');
const router = Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const connectionsRouter = require('./connections');
const employerRouter = require('./employer');
const jobsRouter = require('./jobs');
const typesRouter = require('./types');
const devRouter = require('./dev');
const healthRouter = require('./health');
import { auth } from '../middlewares/authentication';

router.use('/auth', authRouter);
router.use('/user', auth, userRouter);
router.use(jobsRouter);
router.use(connectionsRouter);
router.use(typesRouter);
router.use('/employer', employerRouter);
router.use('/dev', devRouter);
router.use('/health', healthRouter);

module.exports = router;
