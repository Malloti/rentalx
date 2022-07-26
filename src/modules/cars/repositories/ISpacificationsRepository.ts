import { Specification } from '../model/Specification';

interface ICreateSpacificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ name, description }: ICreateSpacificationDTO): void;
  findByName(name: string): Specification;
}

export { ICreateSpacificationDTO, ISpecificationRepository };
