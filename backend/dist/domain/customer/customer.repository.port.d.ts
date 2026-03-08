import { Customer } from './customer.entity';
export declare abstract class CustomerRepositoryPort {
    abstract findById(id: string): Promise<Customer | null>;
    abstract findByEmail(email: string): Promise<Customer | null>;
    abstract save(customer: Customer): Promise<Customer>;
}
