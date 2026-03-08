import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerOrmEntity } from '../entities/customer.orm-entity';
import { CustomerRepositoryPort } from '../../../domain/customer/customer.repository.port';
import { Customer } from '../../../domain/customer/customer.entity';

@Injectable()
export class CustomerRepository implements CustomerRepositoryPort {
  constructor(@InjectRepository(CustomerOrmEntity) private readonly repo: Repository<CustomerOrmEntity>) {}

  async findById(id: string): Promise<Customer | null> {
    const e = await this.repo.findOne({ where: { id } });
    return e ? this.toDomain(e) : null;
  }
  async findByEmail(email: string): Promise<Customer | null> {
    const e = await this.repo.findOne({ where: { email } });
    return e ? this.toDomain(e) : null;
  }
  async save(customer: Customer): Promise<Customer> {
    const entity = this.repo.create(customer.toProps());
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }
  private toDomain(e: CustomerOrmEntity): Customer {
    return new Customer({ id: e.id, email: e.email, fullName: e.fullName, phone: e.phone, createdAt: e.createdAt });
  }
}
