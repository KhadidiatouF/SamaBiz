import { Router } from 'express';
import { ClientController } from '../controllers/ClientController.js';
import { validateBody, validateQuery } from '../middlewares/validateRequest.js';
import { createClientSchema, listClientsSchema, updateClientSchema } from '../validators/clientValidators.js';

export const createClientRoutes = (controller: ClientController): Router => {
  const router = Router();
  router.get('/', validateQuery(listClientsSchema), controller.index);
  router.post('/', validateBody(createClientSchema), controller.store);
  router.get('/:id', controller.show);
  router.patch('/:id', validateBody(updateClientSchema), controller.update);
  router.delete('/:id', controller.destroy);
  return router;
};
