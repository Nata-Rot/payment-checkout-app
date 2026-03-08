import { Repository } from 'typeorm';
import { CustomerOrmEntity } from '../entities/customer.orm-entity';
import { CustomerRepositoryPort } from '../../../domain/customer/customer.repository.port';
import { Customer } from '../../../domain/customer/customer.entity';
export declare class CustomerRepository implements CustomerRepositoryPort {
    private readonly repo;
    constructor(repo: Repository<CustomerOrmEntity>);
    findById(id: string): Promise<Customer | null>;
    findByEmail(email: string): Promise<Customer | null>;
    save(customer: Customer): Promise<Customer>;
    private toDomain;
}
