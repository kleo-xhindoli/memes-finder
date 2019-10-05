import { Response } from 'express';
import { validate, SchemaMap } from 'joi';
import { RequestWithCtx, NextFn } from '../../types';

export function validateBody(schema: SchemaMap) {
  return (req: any, res: Response, next: NextFn) => {
    const validationResult = validate(req.body, schema);
    req.validatedBody = validationResult.value;
    if (validationResult.error) {
      res.status(400).json({
        error: validationResult.error,
      });
    } else {
      next();
    }
  };
}
