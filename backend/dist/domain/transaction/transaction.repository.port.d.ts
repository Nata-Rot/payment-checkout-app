import { Transaction } from './transaction.entity';
export declare abstract class TransactionRepositoryPort {
    abstract findById(id: string): Promise<Transaction | null>;
    abstract findByReference(reference: string): Promise<Transaction | null>;
    abstract save(transaction: Transaction): Promise<Transaction>;
    abstract update(transaction: Transaction): Promise<Transaction>;
}
