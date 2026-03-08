import { CreateTransactionUseCase } from '../../../application/transaction/create-transaction.use-case';
import { GetTransactionUseCase } from '../../../application/transaction/get-transaction.use-case';
import { ProcessPaymentUseCase } from '../../../application/payment/process-payment.use-case';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { ProcessPaymentDto } from '../dtos/process-payment.dto';
export declare class TransactionController {
    private readonly createTransaction;
    private readonly getTransaction;
    private readonly processPayment;
    constructor(createTransaction: CreateTransactionUseCase, getTransaction: GetTransactionUseCase, processPayment: ProcessPaymentUseCase);
    create(dto: CreateTransactionDto): Promise<{
        data: import("../../../domain/transaction/transaction.entity").TransactionProps;
    }>;
    findOne(id: string): Promise<{
        data: import("../../../domain/transaction/transaction.entity").TransactionProps;
    }>;
    process(dto: ProcessPaymentDto): Promise<{
        data: import("../../../application/payment/process-payment.use-case").ProcessPaymentOutput;
    }>;
}
