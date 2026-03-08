import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('customers')
export class CustomerOrmEntity {
  @PrimaryColumn('uuid') id: string;
  @Column({ unique: true, length: 180 }) email: string;
  @Column({ name: 'full_name', length: 150 }) fullName: string;
  @Column({ length: 20 }) phone: string;
  @CreateDateColumn({ name: 'created_at' }) createdAt: Date;
}
