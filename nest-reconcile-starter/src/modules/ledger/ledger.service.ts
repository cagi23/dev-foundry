import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LedgerTransaction, LedgerTransactionDocument } from '@/schemas/ledger-transaction.schema';

@Injectable()
export class LedgerService {
  constructor(@InjectModel(LedgerTransaction.name) private ledgerModel: Model<LedgerTransactionDocument>) {}
  async add(tx: Partial<LedgerTransaction>) {
    const doc = { _id: (tx as any)._id || (tx as any).id, date: tx.date, amount: tx.amount, currency: tx.currency || 'EUR', description: tx.description, reference: tx.reference, status: tx.status || 'recorded' } as any;
    await this.ledgerModel.updateOne({ _id: doc._id }, { $set: doc }, { upsert: true });
    return { ok: true, id: doc._id };
  }
  async all() { return this.ledgerModel.find().lean(); }
}
