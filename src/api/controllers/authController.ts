import boom from 'boom';
import { login, register } from '../../services/Auth.service';
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
    res.json(user);
  } catch (e) {
    if (e instanceof InvalidEmailOrPasswordError) {
      return next(boom.badRequest('email not found!'));
    }
    next(boom.badImplementation());
  }
}

export async function registerUser(req: Request, res: Response, next: NextFn) {
  try {
    const { email, password, firstName, lastName } = req.body;
    const registered = await register(email, password, firstName, lastName);
    res.json(registered);
  } catch (e) {
    if (e instanceof EmailExistsError) {
      return next(boom.badRequest('Email already exists'));
    }
    next(boom.badImplementation());
  }
}
