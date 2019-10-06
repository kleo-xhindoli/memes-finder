import boom from 'boom';
import { Request, Response } from 'express';
import config from '../../config';
import { NextFn } from '../../types';

export function handler(err: any, req: Request, res: Response) {
  const { statusCode } = err.output || 500;
  const response = {
    status: statusCode,
    message: err.message || 'Server Error',
    error: err.output.payload.error || undefined,
    stack: statusCode === 500 ? err.stack : undefined,
  };

  if (config.env !== 'development') {
    delete response.stack;
  }

  res.status(response.status);
  res.json(response);

  // Log 5XX errors
  if (response.status >= 500) {
    console.error(err);
  }
}

export function converter(err: any, req: Request, res: Response, next: NextFn) {
  if (!err) return next();

  if (err.isJoi) {
    const error = boom.badRequest(err.message);
    return handler(error, req, res);
  }

  if (err.isBoom) {
    return handler(err, req, res);
  }

  const error = boom.badImplementation(err.message || 'Server Error');
  return handler(error, req, res);
}

export function notFound(req: Request, res: Response) {
  const err = boom.notFound();
  handler(err, req, res);
}
