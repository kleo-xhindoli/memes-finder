import Router from 'koa-router';
import joi from 'joi';
import { validateBody } from '../middlewares/validator';
import { AppState, InvalidEmailOrPasswordError } from '../types';
import { login, register } from '../services/Auth.service';

const api = 'auth';

const router = new Router<AppState>({
  prefix: `/${api}`,
});

router.post(
  '/login',
  validateBody({
    email: joi.string().email(),
    password: joi.string().min(6),
  }),
  async (ctx, next) => {
    const { email, password } = ctx.state.validatedBody;
    try {
      const user = await login(email, password);
      ctx.body = user;
    } catch (e) {
      if (e instanceof InvalidEmailOrPasswordError) {
        console.log('not here')
        ctx.throw(400, 'Invalid Email or Password');
        next();
      }
    }
  }
);

export default router;
