import { Repository } from 'typeorm';

import AppDataSource from '../../../../database/data-source';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const user = this.repository.create(data);

    await this.repository.save(user);
  }

  async findById(id: string): Promise<User> {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({
      where: {
        email,
      },
    });
  }
}

export { UsersRepository };
