import express, { Request, Response } from 'express';
import joi from 'joi';
import { validateBody } from '../middlewares/validator';
import { InvalidEmailOrPasswordError, EmailExistsError } from '../utils/errors';
import { login, register } from '../services/Auth.service';

const router = express.Router();

router.post(
  '/login',
  validateBody({
    email: joi
      .string()
      .email()
      .required(),
    password: joi
      .string()
      .min(6)
      .required(),
  }),
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await login(email, password);
      res.json(user);
    } catch (e) {
      if (e instanceof InvalidEmailOrPasswordError) {
        res.status(400).json({
          error: {
            message: e.message,
          },
        });
      } else {
        throw e;
      }
    }
  }
);

router.post(
  '/register',
  validateBody({
    email: joi.string().email(),
    password: joi
      .string()
      .min(6)
      .required(),
    firstName: joi
      .string()
      .max(30)
      .required(),
    lastName: joi
      .string()
      .max(30)
      .required(),
  }),
  async (req: Request, res: Response) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      const registered = await register(email, password, firstName, lastName);
      res.json(registered);
    } catch (e) {
      if (e instanceof EmailExistsError) {
        res.status(400).json({
          error: {
            message: e.message,
          },
        });
      }
      throw e;
    }
  }
);

export default router;
