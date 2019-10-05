import { Request, Response } from 'express';
import { NextFn } from '../../types';
import { checkIfUserIsAuthenticated } from '../../services/Auth.service';
import Boom from 'boom';

export default async function auth(req: Request, res: Response, next: NextFn) {
  console.log('auth here');

  let isAuthed;
  const authHeader = req.header('Authorization');
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    isAuthed = checkIfUserIsAuthenticated(token);
  } else {
    next(Boom.unauthorized('Plase login'));
  }

  if (isAuthed) {
    next();
  } else {
    next(Boom.unauthorized('Please authenticate'));
  }
}
