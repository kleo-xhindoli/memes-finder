import { validate, SchemaMap } from 'joi';
import { CustomContext } from '../types';

export function validateBody(schema: SchemaMap) {
  return (ctx: CustomContext, next: () => Promise<any>) => {
    const res = validate(ctx.request.body, schema);
    ctx.state.validatedBody = res.value;
    if (res.error) {
      ctx.throw(400, res.error);
    }
    next();
  };
}
