import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CustomerRepositoryPort } from '../../domain/customer/customer.repository.port';
import { Customer } from '../../domain/customer/customer.entity';
import { Result, ok, err } from '../../shared/result/result';

export interface UpsertCustomerInput {
  email: string; fullName: string; phone: string;
}

@Injectable()
export class UpsertCustomerUseCase {
  constructor(private readonly customerRepo: CustomerRepositoryPort) {}
  async execute(input: UpsertCustomerInput): Promise<Result<Customer>> {
    try {
      const existing = await this.customerRepo.findByEmail(input.email);
      if (existing) return ok(existing);
      const customer = new Customer({
        id: uuid(), email: input.email,
        fullName: input.fullName, phone: input.phone, createdAt: new Date(),
      });
      const saved = await this.customerRepo.save(customer);
      return ok(saved);
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)));
    }
  }
}
