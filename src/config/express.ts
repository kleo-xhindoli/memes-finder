import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import routes from '../routes';

const basePath = process.env.API_BASE_PATH || 'api';

/**
 * Express instance
 * @public
 */
const app = express();

const logs = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Application routes
app.use(`/${basePath}`, routes);

// TODO: errors middlewares

export default app;
