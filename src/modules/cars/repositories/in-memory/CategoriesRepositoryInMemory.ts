import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '@modules/cars/repositories/ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }
  async list(): Promise<Category[]> {
    return this.categories;
  }
  async findByName(name: string): Promise<Category> {
    return this.categories.find(category => category.name === name);
  }
}

export { CategoriesRepositoryInMemory };
