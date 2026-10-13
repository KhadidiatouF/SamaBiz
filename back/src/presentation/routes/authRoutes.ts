import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';
import { validateBody } from '../middlewares/validateRequest.js';
import { loginSchema, registerSchema } from '../validators/authValidators.js';

export const createAuthRoutes = (controller: AuthController): Router => {
  const router = Router();
  router.post('/register', validateBody(registerSchema), controller.register);
  router.post('/login', validateBody(loginSchema), controller.login);
  router.post('/logout', controller.logout);
  router.post('/forgot-password', controller.forgotPassword);
  router.post('/reset-password', controller.resetPassword);
  return router;
};
