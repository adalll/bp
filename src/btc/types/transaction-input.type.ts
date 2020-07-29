import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TransactionInput {
  @Field(() => String)
  txId: string;

  @Field(() => String)
  hex: string;

  @Field(() => Int)
  n: number;

  @Field(() => Int)
  value: number;

  @Field(() => String)
  asm: string;

  @Field(() => String)
  address: string;

  @Field(() => String)
  type: string;
}
