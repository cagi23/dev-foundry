import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { BankModule } from './modules/bank/bank.module';
import { LedgerModule } from './modules/ledger/ledger.module';
import { ReconcileModule } from './modules/reconcile/reconcile.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/reconcile_db'
      }),
      inject: [ConfigService]
    }),
    ScheduleModule.forRoot(),
    BankModule,
    LedgerModule,
    ReconcileModule
  ]
})
export class AppModule {}
