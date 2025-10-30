import { Controller, Get, Query } from '@nestjs/common';
import { BankService } from './bank.service';
@Controller('bank')
export class BankController {
  constructor(private readonly bank: BankService) {}
  @Get('import')
  async import(@Query('accountId') accountId: string) {
    const count = await this.bank.importTransactions(accountId || 'acc_123');
    return { imported: count, accountId: accountId || 'acc_123' };
  }
}
