import Router from 'koa-router';
import authRouter from './auth';

const basePath = process.env.API_BASE_PATH || 'api';

const router = new Router({
  prefix: `/${basePath}`,
});

router.use(authRouter.routes(), authRouter.allowedMethods());

export default router;
