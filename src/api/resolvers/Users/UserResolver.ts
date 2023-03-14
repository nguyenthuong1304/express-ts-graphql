import { Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { UserService } from '../../services/Users/UserService';
import { User } from '../../types/Users/User';

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  public async users(): Promise<any> {
    return await this.userService.getAll().then((result) => {
      return result.rows;
    });
  }
}
