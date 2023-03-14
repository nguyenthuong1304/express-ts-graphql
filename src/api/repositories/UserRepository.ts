import { EntityRepository } from 'typeorm';

import { User } from '../models/User';
import { RepositoryBase } from '../../infrastructure/abstracts/RepositoryBase';

@EntityRepository(User)
export class UserRepository extends RepositoryBase<User> {
  public async createUser(data: object) {
    let entity = new User();

    Object.assign(entity, data);

    return await this.save(entity);
  }

  public async updateUser(user: User, data: object) {
    Object.assign(user, data);

    return await user.save(data);
  }
}
