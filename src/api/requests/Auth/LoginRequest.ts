import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class LoginRequest {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;
}
