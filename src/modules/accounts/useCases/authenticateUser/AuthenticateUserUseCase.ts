import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email or password incorrect');
    }

    const passwordAuth = await compare(password, user.password);
    if (!passwordAuth) {
      throw new AppError('Email or password incorrect');
    }

    const token = sign({}, '822fed5fa5f4833c254b8e14c45a07a0', {
      subject: user.id,
      expiresIn: '1d',
    });

    const auth: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return auth;
  }
}

export { AuthenticateUserUseCase };
