import config from './api/config/vars';
import logger from './api/config/logger';
import app from './api/config/express';
import { connect } from './api/config/mongoose';

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
