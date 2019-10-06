import { config } from 'dotenv-safe';
import path from 'path';

const env = process.env.NODE_ENV || 'development';
let envFile = env === 'test' ? '.env.test' : '.env';

config({
  path: path.join(__dirname, `../${envFile}`),
  sample: path.join(__dirname, '../.env.dev'),
});

const port = process.env.PORT as string;
const mongoConnectionUri = process.env.MONGODB_CONNECTION as string;
const apiBasePath = process.env.API_BASE_PATH as string;
const secret = process.env.SECRET as string;

export default {
  env,
  port,
  mongoConnectionUri,
  apiBasePath,
  secret,
};
