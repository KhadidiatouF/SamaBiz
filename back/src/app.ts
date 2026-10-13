import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { env } from './infrastructure/config/env.js';
import { errorHandler } from './presentation/middlewares/errorHandler.js';
import { notFoundHandler } from './presentation/middlewares/notFoundHandler.js';
import { createApiRoutes } from './presentation/routes/index.js';
import { openApiSpec } from './presentation/swagger/openApi.js';

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.FRONTEND_URL, credentials: true }));
  app.use(express.json({ limit: '1mb' }));
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 300 }));

  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
  app.use('/api', createApiRoutes());
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
