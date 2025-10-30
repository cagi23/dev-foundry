import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LedgerController } from './ledger.controller';
import { LedgerService } from './ledger.service';
import { LedgerTransaction, LedgerTransactionSchema } from '@/schemas/ledger-transaction.schema';

@Module({
  imports: [ MongooseModule.forFeature([{ name: LedgerTransaction.name, schema: LedgerTransactionSchema }]) ],
  controllers: [LedgerController],
  providers: [LedgerService],
  exports: [LedgerService]
})
export class LedgerModule {}
