import { ISpecificationRepository } from '../repositories/ISpacificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpacificationService {
  constructor(private specificationsRepository: ISpecificationRepository) {}

  execute({ name, description }: IRequest): void {
    if (this.specificationsRepository.findByName(name)) {
      throw new Error('Specification already exists!');
    }

    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpacificationService };
