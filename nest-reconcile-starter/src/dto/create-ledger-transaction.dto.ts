import { IsString, IsNumber, IsOptional } from 'class-validator';
export class CreateLedgerTransactionDto {
  @IsString() id: string;
  @IsString() date: string;
  @IsNumber() amount: number;
  @IsString() currency: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsString() reference?: string;
}
