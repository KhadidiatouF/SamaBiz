import { Router } from 'express';
import { DashboardController } from '../controllers/DashboardController.js';

export const createDashboardRoutes = (controller: DashboardController): Router => {
  const router = Router();
  router.get('/summary', controller.summary);
  return router;
};
