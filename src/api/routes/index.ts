import express from 'express';
import authRouter from './auth';
import userRouter from './users';
import memesRouter from './memes';

const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/memes', memesRouter);

export default router;
