import { TransactionRepositoryPort } from '../../domain/transaction/transaction.repository.port';
import { ProductRepositoryPort } from '../../domain/product/product.repository.port';
import { CustomerRepositoryPort } from '../../domain/customer/customer.repository.port';
import { Transaction } from '../../domain/transaction/transaction.entity';
import { Result } from '../../shared/result/result';
export interface CreateTransactionInput {
    productId: string;
    customerId: string;
}
export declare class CreateTransactionUseCase {
    private readonly transactionRepo;
    private readonly productRepo;
    private readonly customerRepo;
    constructor(transactionRepo: TransactionRepositoryPort, productRepo: ProductRepositoryPort, customerRepo: CustomerRepositoryPort);
    execute(input: CreateTransactionInput): Promise<Result<Transaction>>;
}
