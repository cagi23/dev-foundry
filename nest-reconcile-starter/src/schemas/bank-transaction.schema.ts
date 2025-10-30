import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BankTransactionDocument = HydratedDocument<BankTransaction>;

@Schema({ collection: 'bank_transactions', timestamps: true })
export class BankTransaction {
  @Prop({ required: true, unique: true }) id: string;
  @Prop({ required: true }) accountId: string;
  @Prop({ required: true }) date: string;
  @Prop({ required: true }) amount: number;
  @Prop({ required: true, default: 'EUR' }) currency: string;
  @Prop() description?: string;
  @Prop() counterparty?: string;
}
export const BankTransactionSchema = SchemaFactory.createForClass(BankTransaction);
BankTransactionSchema.index({ accountId: 1, date: 1 });
BankTransactionSchema.index({ id: 1 }, { unique: true });
