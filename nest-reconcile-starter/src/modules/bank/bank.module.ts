import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';
import { BankTransaction, BankTransactionSchema } from '@/schemas/bank-transaction.schema';

@Module({
  imports: [ ConfigModule, MongooseModule.forFeature([{ name: BankTransaction.name, schema: BankTransactionSchema }]) ],
  controllers: [BankController],
  providers: [BankService],
  exports: [BankService]
})
export class BankModule {}
