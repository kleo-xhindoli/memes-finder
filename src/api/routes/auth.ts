import express from 'express';
import joi from 'joi';
import { validateBody } from '../middlewares/validator';
import { loginUser, registerUser } from '../controllers/authController';

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
  loginUser
);

router.post(
  '/register',
  validateBody({
    email: joi
      .string()
      .email()
      .required(),
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
  registerUser
);

export default router;
