import express from 'express';
import authRouter from './auth';
import userRouter from './users';

const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));

router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;
