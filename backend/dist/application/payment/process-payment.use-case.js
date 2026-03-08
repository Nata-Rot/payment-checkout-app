"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessPaymentUseCase = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const payment_port_1 = require("../../domain/payment/payment.port");
const transaction_repository_port_1 = require("../../domain/transaction/transaction.repository.port");
const product_repository_port_1 = require("../../domain/product/product.repository.port");
const delivery_repository_port_1 = require("../../domain/delivery/delivery.repository.port");
const delivery_entity_1 = require("../../domain/delivery/delivery.entity");
const transaction_entity_1 = require("../../domain/transaction/transaction.entity");
const domain_errors_1 = require("../../shared/errors/domain.errors");
const result_1 = require("../../shared/result/result");
let ProcessPaymentUseCase = class ProcessPaymentUseCase {
    paymentPort;
    transactionRepo;
    productRepo;
    deliveryRepo;
    constructor(paymentPort, transactionRepo, productRepo, deliveryRepo) {
        this.paymentPort = paymentPort;
        this.transactionRepo = transactionRepo;
        this.productRepo = productRepo;
        this.deliveryRepo = deliveryRepo;
    }
    async execute(input) {
        const transaction = await this.transactionRepo.findById(input.transactionId);
        if (!transaction)
            return (0, result_1.err)(new domain_errors_1.TransactionNotFoundError(input.transactionId));
        if (!transaction.isPending()) {
            return (0, result_1.err)(new domain_errors_1.InvalidTransactionStateError(transaction.status, transaction_entity_1.TransactionStatus.PENDING));
        }
        try {
            const paymentResponse = await this.paymentPort.createTransaction({
                amountInCents: transaction.totalInCents,
                reference: transaction.reference,
                cardToken: input.cardToken,
                installments: input.installments,
                customerEmail: input.customerEmail || '',
            });
            const isApproved = paymentResponse.status === 'APPROVED';
            const updated = isApproved
                ? transaction.approve(paymentResponse.id)
                : transaction.decline(paymentResponse.id);
            await this.transactionRepo.update(updated);
            if (isApproved) {
                await this.productRepo.decrementStock(transaction.productId);
                const delivery = new delivery_entity_1.Delivery({
                    id: (0, uuid_1.v4)(), transactionId: transaction.id,
                    customerId: transaction.customerId, productId: transaction.productId,
                    address: input.deliveryAddress, city: input.deliveryCity,
                    department: input.deliveryDepartment, postalCode: input.deliveryPostalCode,
                    status: delivery_entity_1.DeliveryStatus.ASSIGNED,
                    createdAt: new Date(), updatedAt: new Date(),
                });
                await this.deliveryRepo.save(delivery);
            }
            return (0, result_1.ok)({ transactionId: transaction.id, reference: transaction.reference,
                status: updated.status, wompiTransactionId: paymentResponse.id });
        }
        catch (error) {
            await this.transactionRepo.update(transaction.markAsError());
            return (0, result_1.err)(error instanceof Error
                ? new domain_errors_1.PaymentGatewayError(error.message)
                : new domain_errors_1.PaymentGatewayError('Unknown error'));
        }
    }
};
exports.ProcessPaymentUseCase = ProcessPaymentUseCase;
exports.ProcessPaymentUseCase = ProcessPaymentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payment_port_1.PaymentPort,
        transaction_repository_port_1.TransactionRepositoryPort,
        product_repository_port_1.ProductRepositoryPort,
        delivery_repository_port_1.DeliveryRepositoryPort])
], ProcessPaymentUseCase);
//# sourceMappingURL=process-payment.use-case.js.map