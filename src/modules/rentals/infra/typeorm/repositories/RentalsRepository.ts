import { Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import AppDataSource from '@shared/infra/typeorm/data-source';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  repository: Repository<Rental>;

  constructor() {
    this.repository = AppDataSource.getRepository(Rental);
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create(data);

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.findOne({
      where: { car_id, end_date: null },
    });
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.findOne({
      where: { user_id, end_date: null },
    });
  }

  async findById(id: string): Promise<Rental> {
    return this.repository.findOneBy({ id });
  }
}

export { RentalsRepository };
