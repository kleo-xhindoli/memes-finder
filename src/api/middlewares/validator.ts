import { Response } from 'express';
import { validate, SchemaMap } from 'joi';
import { NextFn } from '../../types';

export function validateBody(schema: SchemaMap) {
  return (req: any, res: Response, next: NextFn) => {
    const validationResult = validate(req.body, schema);
    req.validatedBody = validationResult.value;
    if (validationResult.error) {
      return next(validationResult.error);
    }
    next();
  };
}

export function validateQueryParams(schema: SchemaMap) {
  return (req: any, res: Response, next: NextFn) => {
    const validationResult = validate(req.query, schema);
    req.validatedQueryParams = validationResult.value;
    if (validationResult.error) {
      return next(validationResult.error);
    }
    next();
  }
}
