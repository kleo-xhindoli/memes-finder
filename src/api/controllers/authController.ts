import Boom from 'boom';
import {
  login,
  register,
  generateAuthToken,
} from '../../services/Auth.service';
import { Request, Response } from 'express';
import {
  InvalidEmailOrPasswordError,
  EmailExistsError,
} from '../../utils/errors';
import { NextFn } from '../../types';

export async function loginUser(req: Request, res: Response, next: NextFn) {
  try {
    const { email, password } = req.body;
    const user = await login(email, password);
    const authToken = generateAuthToken(user);
    res.json({ user, authToken });
  } catch (e) {
    if (e instanceof InvalidEmailOrPasswordError) {
      return next(Boom.badRequest('incorrect email or password'));
    }
    next(Boom.badImplementation());
  }
}

export async function registerUser(req: Request, res: Response, next: NextFn) {
  try {
    const { email, password, firstName, lastName } = req.body;
    const user = await register(email, password, firstName, lastName);
    const authToken = generateAuthToken(user);
    res.json({ user, authToken });
  } catch (e) {
    if (e instanceof EmailExistsError) {
      return next(Boom.badRequest('Email already exists'));
    }
    next(Boom.badImplementation());
  }
}
