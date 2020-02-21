import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import ShowOpenDeliveriesController from './app/controllers/ShowOpenDeliveriesController';
import WithdrawController from './app/controllers/WithdrawController';
import FinishDeliveryController from './app/controllers/FinishDeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/deliveryman/:id', ShowOpenDeliveriesController.index);
routes.put(
  '/deliveryman/:deliveryman_id/withdraw/:delivery_id',
  WithdrawController.update
);
routes.put(
  '/deliveryman/:deliveryman_id/finish/:delivery_id',
  upload.single('file'),
  FinishDeliveryController.update
);

routes.get('/delivery/problems', DeliveryProblemController.index);
routes.get('/delivery/:id/problems', DeliveryProblemController.show);
routes.post('/delivery/:id/problems', DeliveryProblemController.store);
routes.use(authMiddleware);
routes.delete('/problem/:id/cancel-delivery', DeliveryProblemController.delete);
routes.put('/users', UserController.update);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);
routes.get('/recipients', RecipientController.index);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/deliveryman', DeliverymanController.store);
routes.get('/deliveryman', DeliverymanController.index);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

routes.post('/delivery', DeliveryController.store);
routes.put('/delivery/:id', DeliveryController.update);
routes.get('/delivery', DeliveryController.index);
routes.delete('/delivery/:id', DeliveryController.delete);

export default routes;
