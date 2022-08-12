import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailablesCarsUseCase } from './ListAvailablesCarsUseCase';

class ListAvailablesCarsController {
  async handle(request: Request, response: Response) {
    const { category_id, brand, name } = request.query;

    const listAvailablesCarsUseCase = container.resolve(
      ListAvailablesCarsUseCase,
    );

    const cars = await listAvailablesCarsUseCase.execute({
      category_id: category_id as string,
      brand: brand as string,
      name: name as string,
    });

    return response.json(cars);
  }
}

export { ListAvailablesCarsController };
