import express from 'express';
import joi from 'joi';
import { validateBody } from '../middlewares/validator';
import {
  loginPayloadSchema,
  registerPayloadSchema,
} from './validation-schemas/authSchemas';
import { loginUser, registerUser } from '../controllers/authController';

const router = express.Router();

router.post('/login', validateBody(loginPayloadSchema), loginUser);

router.post('/register', validateBody(registerPayloadSchema), registerUser);

export default router;
