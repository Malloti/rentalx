import { Router } from 'express';

import { SpecificationsRepository } from '../modules/cars/repositories/SpacificationsRepository';
import { CreateSpacificationService } from '../modules/cars/services/CreateSpacificationService';

const specificationsRoutes = Router();

const specificationsRepository = new SpecificationsRepository();

specificationsRoutes.post('/', (request, response) => {
  const { name, description } = request.body;
  const createSpacificationService = new CreateSpacificationService(
    specificationsRepository,
  );

  createSpacificationService.execute({ name, description });

  return response.status(201).send();
});

export { specificationsRoutes };
