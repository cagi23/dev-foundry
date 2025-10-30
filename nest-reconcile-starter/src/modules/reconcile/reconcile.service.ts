import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BankService } from '../bank/bank.service';
import { LedgerService } from '../ledger/ledger.service';
import { ReconciliationReport, ReconciliationReportDocument } from '@/schemas/reconciliation-report.schema';
import { ConfigService } from '@nestjs/config';
import { BankTransaction } from '@/schemas/bank-transaction.schema';
import { LedgerTransaction } from '@/schemas/ledger-transaction.schema';

function normalizeDesc(s?: string): string {
  return (s || '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
}

// Dice (bigram) similarity 0..1
function diceSimilarity(a?: string, b?: string): number {
  const s1 = normalizeDesc(a); const s2 = normalizeDesc(b);
  if (!s1 || !s2) return 0;
  if (s1 === s2) return 1;
  const bigrams = (s: string) => {
    const arr: string[] = [];
    for (let i = 0; i < s.length - 1; i++) arr.push(s.slice(i, i + 2));
    return arr;
  };
  const aB = bigrams(s1); const bB = bigrams(s2);
  const map = new Map<string, number>();
  for (const g of aB) map.set(g, (map.get(g) || 0) + 1);
  let matches = 0;
  for (const g of bB) {
    const c = map.get(g) || 0;
    if (c > 0) { matches++; map.set(g, c - 1); }
  }
  return (2 * matches) / (aB.length + bB.length || 1);
}

function amountClose(a: number, b: number, tol: number): boolean {
  return Math.abs(a - b) <= tol;
}

@Injectable()
export class ReconcileService {
  private readonly logger = new Logger(ReconcileService.name);
  private readonly cronExpr: string;
  private readonly tol: number;
  private readonly simThreshold: number;

  constructor(
    private readonly bank: BankService,
    private readonly ledger: LedgerService,
    @InjectModel(ReconciliationReport.name) private reportModel: Model<ReconciliationReportDocument>,
    private readonly config: ConfigService
  ) {
    this.cronExpr = this.config.get<string>('RECONCILE_CRON') || CronExpression.EVERY_DAY_AT_3AM;
    this.tol = Number(this.config.get<string>('TOLERANCE_EUR') || '0.5'); // default ±0.50
    this.simThreshold = Number(this.config.get<string>('SIMILARITY_THRESHOLD') || '0.7'); // default 0.70
  }

  @Cron(CronExpression.EVERY_DAY_AT_3AM)
  async scheduledRecon() {
    if (this.cronExpr !== CronExpression.EVERY_DAY_AT_3AM) return;
    this.logger.log('Running scheduled reconciliation for account acc_123');
    await this.reconcile('acc_123');
  }

  // Find best ledger candidate for a given bank tx (same date/currency), by highest similarity within tolerance
  private findBestCandidate(b: any, ledger: any[]) {
    const sameDateCurrency = ledger.filter(l => l.date === b.date && l.currency === b.currency);
    let best = null as any;
    let bestScore = -1;
    for (const l of sameDateCurrency) {
      if (!amountClose(l.amount, b.amount, this.tol)) continue;
      const sim = diceSimilarity(l.description, b.description);
      if (sim >= this.simThreshold && sim > bestScore) {
        best = l; bestScore = sim;
      }
    }
    return { best, score: bestScore };
  }

  async reconcile(accountId: string) {
    const [bankTx, ledgerTx] = await Promise.all([
      this.bank.allByAccount(accountId),
      this.ledger.all()
    ]);

    const matched: any[] = [];
    const fuzzyMatched: any[] = [];
    const missingInLedger: any[] = [];
    const missingInBank: any[] = [];

    // Track used ledger ids to avoid double matching
    const usedLedger = new Set<string>();

    for (const b of bankTx) {
      const { best, score } = this.findBestCandidate(b, ledgerTx.filter(l => !usedLedger.has(l._id)));
      if (best) {
        const exact =
          Math.abs(b.amount - best.amount) < 0.01 &&
          normalizeDesc(b.description) === normalizeDesc(best.description);
        if (exact) {
          matched.push({ bank: b, ledger: best });
        } else {
          fuzzyMatched.push({ bank: b, ledger: best, similarity: Number(score.toFixed(3)) });
        }
        usedLedger.add(best._id);
      } else {
        missingInLedger.push(b);
      }
    }

    // Any ledger not used is missing in bank
    for (const l of ledgerTx) {
      if (!usedLedger.has(l._id)) missingInBank.push(l);
    }

    const report = await this.reportModel.create({
      runDate: new Date(),
      accountId,
      matched: matched.length,
      fuzzy_matched: fuzzyMatched.length,
      missing_in_ledger: missingInLedger.length,
      missing_in_bank: missingInBank.length,
      fuzzyDetails: fuzzyMatched,
      missingInLedgerDetails: missingInLedger,
      missingInBankDetails: missingInBank
    });

    return report.toObject();
  }

  async latestReport(accountId: string) {
    return this.reportModel.findOne({ accountId }).sort({ runDate: -1 }).lean();
  }

  async getReport(id: string) {
    return this.reportModel.findById(id).lean();
  }
}
