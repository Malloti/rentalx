import { In, Repository } from 'typeorm';

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '@modules/cars/repositories/ISpecificationsRepository';
import AppDataSource from '@shared/infra/typeorm/data-source';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    return this.repository.findOneBy({ name });
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findBy({ id: In(ids) });
  }
}

export { SpecificationsRepository };
