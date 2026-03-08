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
exports.CreateTransactionUseCase = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const transaction_repository_port_1 = require("../../domain/transaction/transaction.repository.port");
const product_repository_port_1 = require("../../domain/product/product.repository.port");
const customer_repository_port_1 = require("../../domain/customer/customer.repository.port");
const transaction_entity_1 = require("../../domain/transaction/transaction.entity");
const domain_errors_1 = require("../../shared/errors/domain.errors");
const result_1 = require("../../shared/result/result");
let CreateTransactionUseCase = class CreateTransactionUseCase {
    transactionRepo;
    productRepo;
    customerRepo;
    constructor(transactionRepo, productRepo, customerRepo) {
        this.transactionRepo = transactionRepo;
        this.productRepo = productRepo;
        this.customerRepo = customerRepo;
    }
    async execute(input) {
        const product = await this.productRepo.findById(input.productId);
        if (!product)
            return (0, result_1.err)(new domain_errors_1.ProductNotFoundError(input.productId));
        if (!product.hasStock())
            return (0, result_1.err)(new domain_errors_1.InsufficientStockError(input.productId, product.stock));
        const customer = await this.customerRepo.findById(input.customerId);
        if (!customer)
            return (0, result_1.err)(new domain_errors_1.CustomerNotFoundError(input.customerId));
        const reference = 'TRX-' + Date.now() + '-' + (0, uuid_1.v4)().slice(0, 8).toUpperCase();
        const transaction = new transaction_entity_1.Transaction({
            id: (0, uuid_1.v4)(), reference,
            productId: input.productId, customerId: input.customerId,
            amountInCents: product.priceInCents,
            baseFeeInCents: transaction_entity_1.Transaction.BASE_FEE_IN_CENTS,
            deliveryFeeInCents: transaction_entity_1.Transaction.DELIVERY_FEE_IN_CENTS,
            totalInCents: product.priceInCents + transaction_entity_1.Transaction.BASE_FEE_IN_CENTS + transaction_entity_1.Transaction.DELIVERY_FEE_IN_CENTS,
            status: transaction_entity_1.TransactionStatus.PENDING,
            createdAt: new Date(), updatedAt: new Date(),
        });
        const saved = await this.transactionRepo.save(transaction);
        return (0, result_1.ok)(saved);
    }
};
exports.CreateTransactionUseCase = CreateTransactionUseCase;
exports.CreateTransactionUseCase = CreateTransactionUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transaction_repository_port_1.TransactionRepositoryPort,
        product_repository_port_1.ProductRepositoryPort,
        customer_repository_port_1.CustomerRepositoryPort])
], CreateTransactionUseCase);
//# sourceMappingURL=create-transaction.use-case.js.map