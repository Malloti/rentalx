import dayjs from 'dayjs';

import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;
let carsReposityInMemory: CarsRepositoryInMemory;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(24, 'hour').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    carsReposityInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsReposityInMemory,
    );
  });

  it('Should be able to create a new rent', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '1245',
      car_id: '121212',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('Should not be able to create a new rent if there is another open to the same user', async () => {
    expect.assertions(1);
    try {
      await createRentalUseCase.execute({
        user_id: 'test',
        car_id: '121212',
        expected_return_date: dayAdd24Hours,
      });
      await createRentalUseCase.execute({
        user_id: 'test',
        car_id: '123456',
        expected_return_date: dayAdd24Hours,
      });
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
    }
  });

  it('Should not be able to create a new rent if there is another open to the same car', async () => {
    expect.assertions(1);
    try {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: 'test',
        expected_return_date: dayAdd24Hours,
      });
      await createRentalUseCase.execute({
        user_id: '321',
        car_id: 'test',
        expected_return_date: dayAdd24Hours,
      });
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
    }
  });

  it('Should not be able to create a new rent with invalid return time', async () => {
    expect.assertions(1);
    try {
      await createRentalUseCase.execute({
        user_id: '1245',
        car_id: '121212',
        expected_return_date: dayjs().toDate(),
      });
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
    }
  });
});
