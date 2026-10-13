import { Router } from 'express';
import { container } from '../../infrastructure/config/container.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { createAuthRoutes } from './authRoutes.js';
import { createClientRoutes } from './clientRoutes.js';
import { createDashboardRoutes } from './dashboardRoutes.js';

export const createApiRoutes = (): Router => {
  const router = Router();
  const requireAuth = authMiddleware(container.tokenService);

  router.get('/health', (_req, res) => res.json({ status: 'ok', service: 'samabiz-api' }));
  router.use('/auth', createAuthRoutes(container.authController));
  router.use('/dashboard', requireAuth, createDashboardRoutes(container.dashboardController));
  router.use('/clients', requireAuth, createClientRoutes(container.clientController));

  return router;
};
