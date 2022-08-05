import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import { createConnection } from './database/data-source';
import './shared/container';
import { AppError } from './errors/AppError';
import { router } from './routes';
import swaggerFile from './swagger.json';

createConnection()
  .then(() => console.log('Connection with database has been initialized'))
  .catch(error => console.log('Error during database initialization', error));

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      message: `Internal server error ${err.message}`,
    });
  },
);

app.listen(3333, () => console.log('Server is running at port 3333'));
