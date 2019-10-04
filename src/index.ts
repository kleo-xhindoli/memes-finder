import bodyParser from 'koa-bodyparser';
import { config } from 'dotenv';
import Koa from 'koa';
import logger from 'koa-logger';
import mongoose from 'mongoose';
import helmet from 'koa-helmet';

import router from './routes';
import { AppState } from './types';

config();

const port = process.env.PORT;
const connectionString = process.env.MONGODB_CONNECTION as string;

mongoose.connect(connectionString);
mongoose.connection.on('error', console.error);

const app = new Koa<AppState>();

app
  .use(logger())
  .use(bodyParser())
  .use(helmet());


app.use(router.routes()).use(router.allowedMethods());

app.listen(port);
console.log(`Server running on port ${port}`);
