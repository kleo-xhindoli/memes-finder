import express from 'express';
import auth from '../middlewares/auth';

const router = express.Router();
router.use(auth);
router.get('/user-status', (req, res) => res.send('User router OK'));

export default router;
