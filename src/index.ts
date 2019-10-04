import config from './config/vars';
import logger from './config/logger';
import app from './config/express';
import { connect } from './config/mongoose';

const { port, nodeEnv, mongoConnectionUri } = config;

if (!mongoConnectionUri) {
  throw new Error('No mongo DB connection URI specified in the .env file.');
}

// connect to mongoDB
connect(mongoConnectionUri);

app.listen(port, () =>
  logger.info(`server started on port ${port} (${nodeEnv})`)
);

export default app;
