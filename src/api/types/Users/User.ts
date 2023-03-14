import { Field, ObjectType } from 'type-graphql';
import { BaseDTO } from '../BaseDTO';

@ObjectType({
  description: 'User object.',
})
export class User extends BaseDTO {
  @Field(() => String, { nullable: true })
  public first_name: string;

  @Field(() => String, { nullable: true })
  public last_name: string;

  @Field(() => String, { nullable: true })
  public email: string;
}
