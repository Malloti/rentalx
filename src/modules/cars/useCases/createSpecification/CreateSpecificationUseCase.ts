import { inject, injectable } from 'tsyringe';

import { ISpecificationRepository } from '../../repositories/ISpacificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    if (await this.specificationsRepository.findByName(name)) {
      throw new Error('Specification already exists!');
    }

    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
