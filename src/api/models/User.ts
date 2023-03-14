import { BeforeInsert, BeforeUpdate, Column, Entity, Index } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

import { EntityBase } from '../../infrastructure/abstracts/EntityBase';
import { HashService } from '../../infrastructure/services/hash/HashService';

@Entity({ name: 'users' })
@Index(['email'], { unique: true, where: 'deleted IS NULL' })
export class User extends EntityBase {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Expose({ name: 'full_name' })
  get fullName() {
    return this.first_name + ' ' + this.last_name;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.password) this.password = await new HashService().make(this.password);
  }
}
