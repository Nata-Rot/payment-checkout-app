import { IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @IsUUID() productId: string;
  @IsUUID() customerId: string;
}
