import { Repository } from 'typeorm';
import { TransactionOrmEntity } from '../entities/transaction.orm-entity';
import { TransactionRepositoryPort } from '../../../domain/transaction/transaction.repository.port';
import { Transaction } from '../../../domain/transaction/transaction.entity';
export declare class TransactionRepository implements TransactionRepositoryPort {
    private readonly repo;
    constructor(repo: Repository<TransactionOrmEntity>);
    findById(id: string): Promise<Transaction | null>;
    findByReference(reference: string): Promise<Transaction | null>;
    save(transaction: Transaction): Promise<Transaction>;
    update(transaction: Transaction): Promise<Transaction>;
    private toDomain;
}
