import { Specification } from '../model/Specification';
import {
  ICreateSpacificationDTO,
  ISpecificationRepository,
} from './ISpacificationsRepository';

class SpecificationsRepository implements ISpecificationRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ICreateSpacificationDTO): void {
    const specification = new Specification();
    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }

  findByName(name: string): Specification {
    return this.specifications.find(
      specification => specification.name === name,
    );
  }
}

export { SpecificationsRepository };
