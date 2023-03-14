import { Expose, Transform } from 'class-transformer';
import { Field, Int } from 'type-graphql';

export class ErrorDto {
  @Field(() => String, { nullable: true })
  @Expose()
  readonly resource?: string;

  @Field(() => String, { nullable: true })
  @Expose()
  readonly property?: string;

  @Field()
  @Expose()
  readonly message?: string;

  @Field(() => Int)
  @Expose()
  @Transform(({ value }) => parseInt(value, 10))
  readonly index?: number;
}
