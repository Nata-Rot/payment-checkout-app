import { IsString, IsNotEmpty, IsInt, Min, Max, Length } from 'class-validator';

export class ProcessPaymentDto {
  @IsString() @IsNotEmpty() transactionId: string;
  @IsString() @IsNotEmpty() cardToken: string;
  @IsInt() @Min(1) @Max(36) installments: number;
  @IsString() @IsNotEmpty() deliveryAddress: string;
  @IsString() @IsNotEmpty() deliveryCity: string;
  @IsString() @IsNotEmpty() deliveryDepartment: string;
  @IsString() @Length(4, 10) deliveryPostalCode: string;
  @IsString() @IsNotEmpty() customerEmail: string;
}
