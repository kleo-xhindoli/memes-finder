import express from 'express';
import authRouter from './auth';

const router = express.Router();

router.get('/status', (req, res) => res.send('OK'));

router.use('/auth', authRouter);

export default router;
