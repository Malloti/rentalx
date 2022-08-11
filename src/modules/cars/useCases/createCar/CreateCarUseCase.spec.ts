import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('Should be able to create a new car', async () => {
    const newCar = {
      name: 'Car',
      description: 'New Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: '11s5d41sa',
    };

    const car = await createCarUseCase.execute(newCar);

    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a car with license plate already exists', async () => {
    expect.assertions(1);

    const newCar = {
      name: 'Car',
      description: 'New Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: '11s5d41sa',
    };

    try {
      await createCarUseCase.execute(newCar);
      await createCarUseCase.execute(newCar);
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
    }
  });

  it('Should not be able to create a car with available true by default', async () => {
    const newCar = {
      name: 'Car',
      description: 'New Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: '11s5d41sa',
    };

    const car = await createCarUseCase.execute(newCar);
    expect(car.available).toBe(true);
  });
});
