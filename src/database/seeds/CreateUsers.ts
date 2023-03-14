import { Factory, Seeder } from 'typeorm-seeding';

import { User } from '../../api/models/User';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, _: any): Promise<any> {
    await factory(User)().createMany(1);
  }
}
