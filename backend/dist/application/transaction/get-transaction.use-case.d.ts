import { TransactionRepositoryPort } from '../../domain/transaction/transaction.repository.port';
import { Transaction } from '../../domain/transaction/transaction.entity';
import { TransactionNotFoundError } from '../../shared/errors/domain.errors';
import { Result } from '../../shared/result/result';
export declare class GetTransactionUseCase {
    private readonly transactionRepo;
    constructor(transactionRepo: TransactionRepositoryPort);
    execute(id: string): Promise<Result<Transaction, TransactionNotFoundError>>;
}
