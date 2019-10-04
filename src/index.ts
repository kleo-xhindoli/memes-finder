import Koa from 'koa';
import { config } from 'dotenv';

config();

const port = process.env.PORT;

const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(port);
console.log(`Server running on port ${port}`);
