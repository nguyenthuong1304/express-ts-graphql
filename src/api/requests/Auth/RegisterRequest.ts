import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class RegisterRequest {
  @Field()
  @MaxLength(20)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @Field()
  @MaxLength(20)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @Field()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Field()
  @MaxLength(20)
  @MinLength(6)
  @IsString()
  @IsNotEmpty()
  password: string;
}
