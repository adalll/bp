import { ObjectType, Field, Int } from '@nestjs/graphql';

import { TransactionOutput } from './transaction-output.type';
import { TransactionInput } from './transaction-input.type';

@ObjectType()
export class TransactionForSign {

  @Field(() => Number)
  fee: number;

  @Field(() => [TransactionOutput])
  outputs: TransactionOutput[];

  @Field(() => [TransactionInput])
  inputs: TransactionInput[];
}
