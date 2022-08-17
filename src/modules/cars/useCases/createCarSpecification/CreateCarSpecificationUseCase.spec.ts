import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('Should not be able to add a new specefication to non existent car', async () => {
    expect.assertions(1);

    const car_id = '12354';
    const specifications_id = ['451231'];

    try {
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
    }
  });

  it('Should be able to add a new specefication to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car',
      description: 'New Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: '11s5d41sa',
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'test',
      description: 'test',
    });

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
