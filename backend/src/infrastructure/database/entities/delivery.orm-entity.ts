import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('deliveries')
export class DeliveryOrmEntity {
  @PrimaryColumn('uuid') id: string;
  @Column({ name: 'transaction_id' }) transactionId: string;
  @Column({ name: 'customer_id' }) customerId: string;
  @Column({ name: 'product_id' }) productId: string;
  @Column({ length: 250 }) address: string;
  @Column({ length: 100 }) city: string;
  @Column({ length: 100 }) department: string;
  @Column({ name: 'postal_code', length: 20 }) postalCode: string;
  @Column({ length: 20, default: 'PENDING' }) status: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
