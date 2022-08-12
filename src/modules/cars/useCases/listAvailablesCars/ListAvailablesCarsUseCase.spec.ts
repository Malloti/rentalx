import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailablesCarsUseCase } from './ListAvailablesCarsUseCase';

describe('List Cars', () => {
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let listAvailablesCarsUseCase: ListAvailablesCarsUseCase;

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailablesCarsUseCase = new ListAvailablesCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it('Should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car',
      description: 'New Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: '11s5d41sa',
    });

    const cars = await listAvailablesCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car',
      description: 'New Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: '11s5d41sa',
    });

    const cars = await listAvailablesCarsUseCase.execute({
      category_id: '11s5d41sa',
    });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car',
      description: 'New Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: '11s5d41sa',
    });

    const cars = await listAvailablesCarsUseCase.execute({ brand: 'Brand' });

    expect(cars).toEqual([car]);
  });

  it('Should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car',
      description: 'New Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: '11s5d41sa',
    });

    const cars = await listAvailablesCarsUseCase.execute({ name: 'Car' });

    expect(cars).toEqual([car]);
  });
});
