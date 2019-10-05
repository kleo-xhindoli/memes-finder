import mongoose from 'mongoose';
import logger from './logger';

const env = process.env.NODE_ENV;

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', err => {
  logger.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// print mongoose logs in dev env
if (env === 'development') {
  mongoose.set('debug', true);
}

/**
 * Connect to mongo db
 *
 * @returns {object} Mongoose connection
 * @public
 */

export function connect(mongoUri: string) {
  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    keepAlive: true,
  });
  return mongoose.connection;
}
