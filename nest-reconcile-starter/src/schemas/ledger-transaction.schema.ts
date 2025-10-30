import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LedgerTransactionDocument = HydratedDocument<LedgerTransaction>;

@Schema({ collection: 'ledger_transactions', timestamps: true })
export class LedgerTransaction {
  @Prop({ required: true, unique: true }) _id: string;
  @Prop({ required: true }) date: string;
  @Prop({ required: true }) amount: number;
  @Prop({ required: true, default: 'EUR' }) currency: string;
  @Prop() description?: string;
  @Prop() reference?: string;
  @Prop({ default: 'recorded', enum: ['recorded', 'reconciled', 'pending', 'void'] }) status: string;
}
export const LedgerTransactionSchema = SchemaFactory.createForClass(LedgerTransaction);
LedgerTransactionSchema.index({ date: 1 });
LedgerTransactionSchema.index({ reference: 1 }, { sparse: true });
