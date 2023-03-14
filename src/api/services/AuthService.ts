import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { BadRequestError } from 'routing-controllers';

import { UserRepository } from '../repositories/UserRepository';
import { InvalidCredentials } from '../exceptions/Auth/InvalidCredentials';
import { LoginRequest } from '../requests/Auth/LoginRequest';
import { HashService } from '../../infrastructure/services/hash/HashService';
import { AuthServiceProvider } from '../../infrastructure/services/auth/AuthService';
import { RegisterRequest } from '../requests/Auth/RegisterRequest';
import { AuthDTO } from '../types/Auth/AuthDTO';
import { SendWelcomeMail } from '../queue-jobs/Users/SendWelcomeMail';

@Service()
export class AuthService {
  constructor(
    @InjectRepository() private userRepository: UserRepository,
    private authService: AuthServiceProvider,
    private hashService: HashService,
  ) {}

  public async login(data: LoginRequest): Promise<AuthDTO> {
    let user = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new InvalidCredentials();
    }

    if (!(await this.hashService.compare(data.password, user.password))) {
      throw new InvalidCredentials();
    }

    return this.authService.sign(
      {
        userId: user.id,
        email: user.email,
      },
      { user: { id: user.id, email: user.email } },
    );
  }

  public async register(data: RegisterRequest): Promise<AuthDTO> {
    const userExists = (await this.userRepository
      .createQueryBuilder()
      .where({ email: data.email })
      .getCount()) > 0;

    if (userExists) {
      throw new BadRequestError('Email already in use');
    }

    const user = await this.userRepository.createUser(data);

    new SendWelcomeMail(user).dispatch();

    return this.authService.sign(
      {
        userId: user.id,
        email: user.email,
      },
      { user: { id: user.id, email: user.email } },
    );
  }
}
