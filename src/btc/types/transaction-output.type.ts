import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TransactionOutput {
  @Field(() => String)
  address: string;

  @Field(() => Int)
  amount: number;
}
