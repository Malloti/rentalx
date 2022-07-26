import { Specification } from '../../model/Specification';
import {
  ICreateSpacificationDTO,
  ISpecificationRepository,
} from '../ISpacificationsRepository';

class SpecificationsRepository implements ISpecificationRepository {
  private specifications: Specification[];

  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance() {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }

    return SpecificationsRepository.INSTANCE;
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
