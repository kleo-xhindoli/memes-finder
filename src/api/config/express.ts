import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import config from '../../config';

import routes from '../routes';
import { converter, notFound, handler } from '../middlewares/error';

/**
 * Express instance
 * @public
 */
const app = express();

const logs = config.env === 'production' ? 'combined' : 'dev';
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
app.use(`/${config.apiBasePath}`, routes);

// Error handlers
app.use(converter);
app.use(notFound);
app.use(handler);

export default app;
