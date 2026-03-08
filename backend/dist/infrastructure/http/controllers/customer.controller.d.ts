import { UpsertCustomerUseCase } from '../../../application/customer/upsert-customer.use-case';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
export declare class CustomerController {
    private readonly upsertCustomer;
    constructor(upsertCustomer: UpsertCustomerUseCase);
    create(dto: CreateCustomerDto): Promise<{
        data: import("../../../domain/customer/customer.entity").CustomerProps;
    }>;
}
