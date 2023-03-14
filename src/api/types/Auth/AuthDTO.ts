import { Field, ObjectType } from 'type-graphql';
import { User } from '../Users/User';
import { Type } from 'class-transformer';

@ObjectType()
export class AuthDTO {
  @Field(() => User)
  @Type(() => User)
  user: User;

  @Field(() => String)
  @Type(() => String)
  access_token: string;

  @Field(() => String)
  @Type(() => String)
  expires_in: string;
}
