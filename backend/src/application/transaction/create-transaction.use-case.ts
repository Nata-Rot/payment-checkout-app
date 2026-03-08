import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TransactionRepositoryPort } from '../../domain/transaction/transaction.repository.port';
import { ProductRepositoryPort } from '../../domain/product/product.repository.port';
import { CustomerRepositoryPort } from '../../domain/customer/customer.repository.port';
import { Transaction, TransactionStatus } from '../../domain/transaction/transaction.entity';
import { ProductNotFoundError, InsufficientStockError, CustomerNotFoundError } from '../../shared/errors/domain.errors';
import { Result, ok, err } from '../../shared/result/result';

export interface CreateTransactionInput {
  productId: string; customerId: string;
}

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    private readonly transactionRepo: TransactionRepositoryPort,
    private readonly productRepo: ProductRepositoryPort,
    private readonly customerRepo: CustomerRepositoryPort,
  ) {}

  async execute(input: CreateTransactionInput): Promise<Result<Transaction>> {
    const product = await this.productRepo.findById(input.productId);
    if (!product) return err(new ProductNotFoundError(input.productId));
    if (!product.hasStock()) return err(new InsufficientStockError(input.productId, product.stock));

    const customer = await this.customerRepo.findById(input.customerId);
    if (!customer) return err(new CustomerNotFoundError(input.customerId));

    const reference = 'TRX-' + Date.now() + '-' + uuid().slice(0, 8).toUpperCase();
    const transaction = new Transaction({
      id: uuid(), reference,
      productId: input.productId, customerId: input.customerId,
      amountInCents: product.priceInCents,
      baseFeeInCents: Transaction.BASE_FEE_IN_CENTS,
      deliveryFeeInCents: Transaction.DELIVERY_FEE_IN_CENTS,
      totalInCents: product.priceInCents + Transaction.BASE_FEE_IN_CENTS + Transaction.DELIVERY_FEE_IN_CENTS,
      status: TransactionStatus.PENDING,
      createdAt: new Date(), updatedAt: new Date(),
    });
    const saved = await this.transactionRepo.save(transaction);
    return ok(saved);
  }
}
