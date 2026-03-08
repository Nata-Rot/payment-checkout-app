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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const create_transaction_use_case_1 = require("../../../application/transaction/create-transaction.use-case");
const get_transaction_use_case_1 = require("../../../application/transaction/get-transaction.use-case");
const process_payment_use_case_1 = require("../../../application/payment/process-payment.use-case");
const create_transaction_dto_1 = require("../dtos/create-transaction.dto");
const process_payment_dto_1 = require("../dtos/process-payment.dto");
const domain_errors_1 = require("../../../shared/errors/domain.errors");
let TransactionController = class TransactionController {
    createTransaction;
    getTransaction;
    processPayment;
    constructor(createTransaction, getTransaction, processPayment) {
        this.createTransaction = createTransaction;
        this.getTransaction = getTransaction;
        this.processPayment = processPayment;
    }
    async create(dto) {
        const result = await this.createTransaction.execute(dto);
        if (result.isErr()) {
            const e = result.error;
            if (e instanceof domain_errors_1.ProductNotFoundError || e instanceof domain_errors_1.CustomerNotFoundError)
                throw new common_1.NotFoundException(e.message);
            if (e instanceof domain_errors_1.InsufficientStockError)
                throw new common_1.BadRequestException(e.message);
            throw e;
        }
        return { data: result.value.toProps() };
    }
    async findOne(id) {
        const result = await this.getTransaction.execute(id);
        if (result.isErr())
            throw new common_1.NotFoundException(result.error.message);
        return { data: result.value.toProps() };
    }
    async process(dto) {
        const result = await this.processPayment.execute(dto);
        if (result.isErr()) {
            const e = result.error;
            if (e instanceof domain_errors_1.TransactionNotFoundError)
                throw new common_1.NotFoundException(e.message);
            throw new common_1.BadRequestException(e.message);
        }
        return { data: result.value };
    }
};
exports.TransactionController = TransactionController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_transaction_dto_1.CreateTransactionDto]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('process'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [process_payment_dto_1.ProcessPaymentDto]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "process", null);
exports.TransactionController = TransactionController = __decorate([
    (0, common_1.Controller)('api/v1/transactions'),
    __metadata("design:paramtypes", [create_transaction_use_case_1.CreateTransactionUseCase,
        get_transaction_use_case_1.GetTransactionUseCase,
        process_payment_use_case_1.ProcessPaymentUseCase])
], TransactionController);
//# sourceMappingURL=transaction.controller.js.map