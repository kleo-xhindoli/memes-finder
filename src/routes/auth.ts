import express, { Request, Response } from 'express';
import joi from 'joi';
import { validateBody } from '../middlewares/validator';
import { InvalidEmailOrPasswordError } from '../utils/errors';
import { login, register } from '../services/Auth.service';

const router = express.Router();

router.post(
  '/login',
  validateBody({
    email: joi.string().email(),
    password: joi.string().min(6),
  }),
  (req: Request, res: Response) => {
    res.json('hey there');
  }
);

export default router;
