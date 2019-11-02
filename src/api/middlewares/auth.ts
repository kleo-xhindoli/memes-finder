import { Request, Response } from 'express';
import { NextFn } from '../../types';
import { verifyAndDecode } from '../../services/Auth.service';
import Boom from 'boom';

export default async function auth(req: any, res: Response, next: NextFn) {
  const authHeader = req.header('Authorization');
  if (!authHeader)
    return next(Boom.unauthorized('Authorization header is missing'));

  try {
    const token = authHeader.replace('Bearer ', '');
    const decoded = verifyAndDecode(token);
    req.decoded = decoded;
  } catch (e) {
    next(Boom.unauthorized('Invalid token'));
  }
}
