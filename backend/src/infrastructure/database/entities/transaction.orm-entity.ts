import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('transactions')
export class TransactionOrmEntity {
  @PrimaryColumn('uuid') id: string;
  @Column({ unique: true, length: 100 }) reference: string;
  @Column({ name: 'product_id' }) productId: string;
  @Column({ name: 'customer_id' }) customerId: string;
  @Column({ name: 'amount_in_cents', type: 'int' }) amountInCents: number;
  @Column({ name: 'base_fee_in_cents', type: 'int' }) baseFeeInCents: number;
  @Column({ name: 'delivery_fee_in_cents', type: 'int' }) deliveryFeeInCents: number;
  @Column({ name: 'total_in_cents', type: 'int' }) totalInCents: number;
  @Column({ length: 20, default: 'PENDING' }) status: string;
  @Column({ name: 'wompi_transaction_id', nullable: true, length: 150 }) wompiTransactionId?: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
