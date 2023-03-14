import { Args, Mutation, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { plainToInstance } from 'class-transformer';

import { User } from '../../types/Users/User';
import { LoginRequest } from '../../requests/Auth/LoginRequest';
import { RegisterRequest } from '../../requests/Auth/RegisterRequest';
import { AuthService } from '../../services/AuthService';
import { AuthDTO } from '../../types/Auth/AuthDTO';

@Service()
@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthDTO)
  public async login(@Args() signInArgs: LoginRequest): Promise<AuthDTO> {
    return plainToInstance(AuthDTO, await this.authService.login(signInArgs));
  }

  @Mutation(() => AuthDTO)
  public async register(@Args() signUpArgs: RegisterRequest): Promise<AuthDTO> {
    const result = await this.authService.register(signUpArgs);

    return plainToInstance(AuthDTO, result);
  }
}
