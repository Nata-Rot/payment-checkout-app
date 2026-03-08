import { Controller, Post, Get, Body, Param, NotFoundException, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateTransactionUseCase } from '../../../application/transaction/create-transaction.use-case';
import { GetTransactionUseCase } from '../../../application/transaction/get-transaction.use-case';
import { ProcessPaymentUseCase } from '../../../application/payment/process-payment.use-case';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { ProcessPaymentDto } from '../dtos/process-payment.dto';
import { ProductNotFoundError, InsufficientStockError, CustomerNotFoundError, TransactionNotFoundError } from '../../../shared/errors/domain.errors';

@Controller('api/v1/transactions')
export class TransactionController {
  constructor(
    private readonly createTransaction: CreateTransactionUseCase,
    private readonly getTransaction: GetTransactionUseCase,
    private readonly processPayment: ProcessPaymentUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTransactionDto) {
    const result = await this.createTransaction.execute(dto);
    if (result.isErr()) {
      const e = result.error;
      if (e instanceof ProductNotFoundError || e instanceof CustomerNotFoundError) throw new NotFoundException(e.message);
      if (e instanceof InsufficientStockError) throw new BadRequestException(e.message);
      throw e;
    }
    return { data: result.value.toProps() };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.getTransaction.execute(id);
    if (result.isErr()) throw new NotFoundException(result.error.message);
    return { data: result.value.toProps() };
  }

  @Post('process')
  @HttpCode(HttpStatus.OK)
  async process(@Body() dto: ProcessPaymentDto) {
    const result = await this.processPayment.execute(dto);
    if (result.isErr()) {
      const e = result.error;
      if (e instanceof TransactionNotFoundError) throw new NotFoundException(e.message);
      throw new BadRequestException(e.message);
    }
    return { data: result.value };
  }
}
