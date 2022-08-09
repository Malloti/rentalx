import { Repository } from 'typeorm';

import AppDataSource from '@database/data-source';
import { Specification } from '@modules/cars/entities/Specification';
import {
  ICreateSpacificationDTO,
  ISpecificationRepository,
} from '@modules/cars/repositories/ISpacificationsRepository';

class SpecificationsRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({ name, description }: ICreateSpacificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    return this.repository.findOne({
      where: {
        name,
      },
    });
  }
}

export { SpecificationsRepository };
