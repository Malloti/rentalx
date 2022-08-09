import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

interface ICreateSpacificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ name, description }: ICreateSpacificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { ICreateSpacificationDTO, ISpecificationRepository };
