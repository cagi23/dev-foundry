import { Body, Controller, Get, Post } from '@nestjs/common';
import { LedgerService } from './ledger.service';
import { CreateLedgerTransactionDto } from '@/dto/create-ledger-transaction.dto';
@Controller('ledger')
export class LedgerController {
  constructor(private readonly ledger: LedgerService) {}
  @Post('transactions')
  async create(@Body() body: CreateLedgerTransactionDto) {
    return this.ledger.add({ _id: body.id, date: body.date, amount: body.amount, currency: body.currency, description: body.description, reference: body.reference });
  }
  @Get('transactions')
  async list() { return this.ledger.all(); }
}
