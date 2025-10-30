import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ReconcileService } from './reconcile.service';

@Controller()
export class ReconcileController {
  constructor(private readonly reconcile: ReconcileService) {}

  @Post('reconcile')
  async run(@Query('accountId') accountId: string) {
    const acct = accountId || 'acc_123';
    const report = await this.reconcile.reconcile(acct);
    return { message: 'Reconciliation complete', reportId: report._id, summary: {
      matched: report.matched,
      fuzzy_matched: report.fuzzy_matched,
      missing_in_ledger: report.missing_in_ledger,
      missing_in_bank: report.missing_in_bank
    }};
  }

  @Get('reports/latest')
  async latest(@Query('accountId') accountId: string) {
    const acct = accountId || 'acc_123';
    return this.reconcile.latestReport(acct);
  }

  @Get('reports/:id')
  async byId(@Param('id') id: string) {
    return this.reconcile.getReport(id);
  }
}
