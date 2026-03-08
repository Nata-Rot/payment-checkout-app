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
exports.GetTransactionUseCase = void 0;
const common_1 = require("@nestjs/common");
const transaction_repository_port_1 = require("../../domain/transaction/transaction.repository.port");
const domain_errors_1 = require("../../shared/errors/domain.errors");
const result_1 = require("../../shared/result/result");
let GetTransactionUseCase = class GetTransactionUseCase {
    transactionRepo;
    constructor(transactionRepo) {
        this.transactionRepo = transactionRepo;
    }
    async execute(id) {
        const transaction = await this.transactionRepo.findById(id);
        if (!transaction)
            return (0, result_1.err)(new domain_errors_1.TransactionNotFoundError(id));
        return (0, result_1.ok)(transaction);
    }
};
exports.GetTransactionUseCase = GetTransactionUseCase;
exports.GetTransactionUseCase = GetTransactionUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transaction_repository_port_1.TransactionRepositoryPort])
], GetTransactionUseCase);
//# sourceMappingURL=get-transaction.use-case.js.map