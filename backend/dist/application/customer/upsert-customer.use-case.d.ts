import { CustomerRepositoryPort } from '../../domain/customer/customer.repository.port';
import { Customer } from '../../domain/customer/customer.entity';
import { Result } from '../../shared/result/result';
export interface UpsertCustomerInput {
    email: string;
    fullName: string;
    phone: string;
}
export declare class UpsertCustomerUseCase {
    private readonly customerRepo;
    constructor(customerRepo: CustomerRepositoryPort);
    execute(input: UpsertCustomerInput): Promise<Result<Customer>>;
}
