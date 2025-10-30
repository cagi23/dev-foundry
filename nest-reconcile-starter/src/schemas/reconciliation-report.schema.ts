import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReconciliationReportDocument = HydratedDocument<ReconciliationReport>;

@Schema({ collection: 'reconciliation_reports', timestamps: true })
export class ReconciliationReport {
  @Prop({ required: true }) runDate: Date;
  @Prop({ required: true }) accountId: string;

  // Exact matches
  @Prop({ required: true }) matched: number;

  // Fuzzy matches count
  @Prop({ required: true, default: 0 }) fuzzy_matched: number;

  // Missing counts
  @Prop({ required: true }) missing_in_ledger: number;
  @Prop({ required: true }) missing_in_bank: number;

  // Details
  @Prop({ type: Array, default: [] }) fuzzyDetails: any[];
  @Prop({ type: Array, default: [] }) missingInLedgerDetails: any[];
  @Prop({ type: Array, default: [] }) missingInBankDetails: any[];
}

export const ReconciliationReportSchema = SchemaFactory.createForClass(ReconciliationReport);
ReconciliationReportSchema.index({ accountId: 1, runDate: -1 });
