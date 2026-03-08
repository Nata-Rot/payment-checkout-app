import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionOrmEntity } from '../entities/transaction.orm-entity';
import { TransactionRepositoryPort } from '../../../domain/transaction/transaction.repository.port';
import { Transaction, TransactionStatus } from '../../../domain/transaction/transaction.entity';

@Injectable()
export class TransactionRepository implements TransactionRepositoryPort {
  constructor(@InjectRepository(TransactionOrmEntity) private readonly repo: Repository<TransactionOrmEntity>) {}

  async findById(id: string): Promise<Transaction | null> {
    const e = await this.repo.findOne({ where: { id } });
    return e ? this.toDomain(e) : null;
  }
  async findByReference(reference: string): Promise<Transaction | null> {
    const e = await this.repo.findOne({ where: { reference } });
    return e ? this.toDomain(e) : null;
  }
  async save(transaction: Transaction): Promise<Transaction> {
    const entity = this.repo.create(transaction.toProps());
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }
  async update(transaction: Transaction): Promise<Transaction> {
    const props = transaction.toProps();
    await this.repo.update(props.id, {
      status: props.status, wompiTransactionId: props.wompiTransactionId, updatedAt: props.updatedAt,
    });
    const updated = await this.repo.findOneOrFail({ where: { id: props.id } });
    return this.toDomain(updated);
  }
  private toDomain(e: TransactionOrmEntity): Transaction {
    return new Transaction({ id: e.id, reference: e.reference, productId: e.productId,
      customerId: e.customerId, amountInCents: e.amountInCents, baseFeeInCents: e.baseFeeInCents,
      deliveryFeeInCents: e.deliveryFeeInCents, totalInCents: e.totalInCents,
      status: e.status as TransactionStatus, wompiTransactionId: e.wompiTransactionId,
      createdAt: e.createdAt, updatedAt: e.updatedAt });
  }
}
