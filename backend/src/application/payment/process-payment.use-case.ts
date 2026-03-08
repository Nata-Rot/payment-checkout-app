import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { PaymentPort } from '../../domain/payment/payment.port';
import { TransactionRepositoryPort } from '../../domain/transaction/transaction.repository.port';
import { ProductRepositoryPort } from '../../domain/product/product.repository.port';
import { DeliveryRepositoryPort } from '../../domain/delivery/delivery.repository.port';
import { Delivery, DeliveryStatus } from '../../domain/delivery/delivery.entity';
import { TransactionStatus } from '../../domain/transaction/transaction.entity';
import { TransactionNotFoundError, InvalidTransactionStateError, PaymentGatewayError } from '../../shared/errors/domain.errors';
import { Result, ok, err } from '../../shared/result/result';

export interface ProcessPaymentInput {
  transactionId: string; cardToken: string; installments: number;
  deliveryAddress: string; deliveryCity: string;
  deliveryDepartment: string; deliveryPostalCode: string;
  customerEmail?: string;
}

export interface ProcessPaymentOutput {
  transactionId: string; reference: string;
  status: TransactionStatus; wompiTransactionId?: string;
}

@Injectable()
export class ProcessPaymentUseCase {
  constructor(
    private readonly paymentPort: PaymentPort,
    private readonly transactionRepo: TransactionRepositoryPort,
    private readonly productRepo: ProductRepositoryPort,
    private readonly deliveryRepo: DeliveryRepositoryPort,
  ) {}

  async execute(input: ProcessPaymentInput): Promise<Result<ProcessPaymentOutput>> {
    const transaction = await this.transactionRepo.findById(input.transactionId);
    if (!transaction) return err(new TransactionNotFoundError(input.transactionId));
    if (!transaction.isPending()) {
      return err(new InvalidTransactionStateError(transaction.status, TransactionStatus.PENDING));
    }
    try {
      const paymentResponse = await this.paymentPort.createTransaction({
        amountInCents: transaction.totalInCents,
        reference: transaction.reference,
        cardToken: input.cardToken,
        installments: input.installments,
        customerEmail: input.customerEmail || '',
      });

      const isApproved = paymentResponse.status === 'APPROVED';
      const updated = isApproved
        ? transaction.approve(paymentResponse.id)
        : transaction.decline(paymentResponse.id);

      await this.transactionRepo.update(updated);

      if (isApproved) {
        await this.productRepo.decrementStock(transaction.productId);
        const delivery = new Delivery({
          id: uuid(), transactionId: transaction.id,
          customerId: transaction.customerId, productId: transaction.productId,
          address: input.deliveryAddress, city: input.deliveryCity,
          department: input.deliveryDepartment, postalCode: input.deliveryPostalCode,
          status: DeliveryStatus.ASSIGNED,
          createdAt: new Date(), updatedAt: new Date(),
        });
        await this.deliveryRepo.save(delivery);
      }

      return ok({ transactionId: transaction.id, reference: transaction.reference,
        status: updated.status, wompiTransactionId: paymentResponse.id });
    } catch (error) {
      await this.transactionRepo.update(transaction.markAsError());
      return err(error instanceof Error
        ? new PaymentGatewayError(error.message)
        : new PaymentGatewayError('Unknown error'));
    }
  }
}
