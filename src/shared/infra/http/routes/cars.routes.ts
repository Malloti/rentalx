import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailablesCarsController } from '@modules/cars/useCases/listAvailablesCars/ListAvailablesCarsController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailablesCarsController = new ListAvailablesCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.get('/availables', listAvailablesCarsController.handle);

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
);

export { carsRoutes };
