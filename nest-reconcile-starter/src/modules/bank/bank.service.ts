import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { BankTransaction, BankTransactionDocument } from '@/schemas/bank-transaction.schema';

@Injectable()
export class BankService {
  private readonly logger = new Logger(BankService.name);
  private base: string;
  constructor(private readonly config: ConfigService, @InjectModel(BankTransaction.name) private bankTxModel: Model<BankTransactionDocument>) {
    this.base = this.config.get<string>('BANK_API_BASE') || 'http://localhost:4000';
  }
  async importTransactions(accountId: string): Promise<number> {
    const url = `${this.base}/api/v1/transactions?accountId=${encodeURIComponent(accountId)}`;
    this.logger.log(`Fetching bank transactions from ${url}`);
    const { data } = await axios.get(url, { timeout: 10000 });
    const items: any[] = Array.isArray(data) ? data : [];
    let upserts = 0;
    for (const t of items) {
      const doc = { id: t.id, accountId, date: t.date, amount: t.amount, currency: t.currency || 'EUR', description: t.description, counterparty: t.counterparty };
      try {
        const res = await this.bankTxModel.updateOne({ id: doc.id }, { $setOnInsert: doc }, { upsert: true });
        if (res.upsertedCount || res.modifiedCount) upserts += 1;
      } catch (e) { this.logger.warn(`Failed upsert for bank tx ${doc.id}: ${e}`); }
    }
    return upserts;
  }
  async allByAccount(accountId: string) { return this.bankTxModel.find({ accountId }).lean(); }
}
