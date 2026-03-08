import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class ProductOrmEntity {
  @PrimaryColumn('uuid') id: string;
  @Column({ length: 120 }) name: string;
  @Column('text') description: string;
  @Column({ name: 'price_in_cents', type: 'int' }) priceInCents: number;
  @Column({ type: 'int', default: 0 }) stock: number;
  @Column({ name: 'image_url', length: 512 }) imageUrl: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' }) updatedAt: Date;
}
