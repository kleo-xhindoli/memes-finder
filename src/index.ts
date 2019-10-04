import bodyParser from 'koa-bodyparser';
import { config } from 'dotenv';
import Koa from 'koa';
import logger from 'koa-logger';
import mongoose from 'mongoose';
import helmet from 'koa-helmet';

config();

const port = process.env.PORT;
const connectionString = process.env.MONGODB_CONNECTION as string;

mongoose.connect(connectionString);
mongoose.connection.on('error', console.error);

const app = new Koa();

app
  .use(logger())
  .use(bodyParser())
  .use(helmet());

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(port);
console.log(`Server running on port ${port}`);
