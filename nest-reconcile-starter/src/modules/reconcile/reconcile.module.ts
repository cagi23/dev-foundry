import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ReconcileController } from './reconcile.controller';
import { ReconcileService } from './reconcile.service';
import { BankModule } from '../bank/bank.module';
import { LedgerModule } from '../ledger/ledger.module';
import { ReconciliationReport, ReconciliationReportSchema } from '@/schemas/reconciliation-report.schema';

@Module({
  imports: [ ScheduleModule, BankModule, LedgerModule, MongooseModule.forFeature([{ name: ReconciliationReport.name, schema: ReconciliationReportSchema }]) ],
  controllers: [ReconcileController],
  providers: [ReconcileService]
})
export class ReconcileModule {}
