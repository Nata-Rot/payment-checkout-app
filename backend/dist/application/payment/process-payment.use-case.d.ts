import { PaymentPort } from '../../domain/payment/payment.port';
import { TransactionRepositoryPort } from '../../domain/transaction/transaction.repository.port';
import { ProductRepositoryPort } from '../../domain/product/product.repository.port';
import { DeliveryRepositoryPort } from '../../domain/delivery/delivery.repository.port';
import { TransactionStatus } from '../../domain/transaction/transaction.entity';
import { Result } from '../../shared/result/result';
export interface ProcessPaymentInput {
    transactionId: string;
    cardToken: string;
    installments: number;
    deliveryAddress: string;
    deliveryCity: string;
    deliveryDepartment: string;
    deliveryPostalCode: string;
    customerEmail?: string;
}
export interface ProcessPaymentOutput {
    transactionId: string;
    reference: string;
    status: TransactionStatus;
    wompiTransactionId?: string;
}
export declare class ProcessPaymentUseCase {
    private readonly paymentPort;
    private readonly transactionRepo;
    private readonly productRepo;
    private readonly deliveryRepo;
    constructor(paymentPort: PaymentPort, transactionRepo: TransactionRepositoryPort, productRepo: ProductRepositoryPort, deliveryRepo: DeliveryRepositoryPort);
    execute(input: ProcessPaymentInput): Promise<Result<ProcessPaymentOutput>>;
}
