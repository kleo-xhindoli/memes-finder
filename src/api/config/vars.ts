import { config } from 'dotenv';

config();

const {
  NODE_ENV: nodeEnv,
  PORT: port,
  MONGODB_CONNECTION: mongoConnectionUri,
  API_BASE_PATH: apiBasePath,
  SECRET: secret,
} = process.env;

export default {
  nodeEnv,
  port,
  mongoConnectionUri,
  apiBasePath,
  secret,
};
