import { Request } from 'express';

export interface Context {
  validation: {
    validatedBody: any;
  };
}

export interface RequestWithCtx extends Request {
  ctx: Context;
}

export type NextFn = (err?: Error | string) => any;
