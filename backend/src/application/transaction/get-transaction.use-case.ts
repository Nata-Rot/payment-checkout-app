import { Injectable } from '@nestjs/common';
import { TransactionRepositoryPort } from '../../domain/transaction/transaction.repository.port';
import { Transaction } from '../../domain/transaction/transaction.entity';
import { TransactionNotFoundError } from '../../shared/errors/domain.errors';
import { Result, ok, err } from '../../shared/result/result';

@Injectable()
export class GetTransactionUseCase {
  constructor(private readonly transactionRepo: TransactionRepositoryPort) {}
  async execute(id: string): Promise<Result<Transaction, TransactionNotFoundError>> {
    const transaction = await this.transactionRepo.findById(id);
    if (!transaction) return err(new TransactionNotFoundError(id));
    return ok(transaction);
  }
}
