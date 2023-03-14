import { Field, ID, ObjectType } from 'type-graphql';
import { Type } from 'class-transformer';

@ObjectType()
export class BaseDTO {
  @Field(() => ID, { nullable: true })
  @Type(() => Number)
  id: number;
}
