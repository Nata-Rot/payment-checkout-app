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
exports.TransactionRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transaction_orm_entity_1 = require("../entities/transaction.orm-entity");
const transaction_entity_1 = require("../../../domain/transaction/transaction.entity");
let TransactionRepository = class TransactionRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async findById(id) {
        const e = await this.repo.findOne({ where: { id } });
        return e ? this.toDomain(e) : null;
    }
    async findByReference(reference) {
        const e = await this.repo.findOne({ where: { reference } });
        return e ? this.toDomain(e) : null;
    }
    async save(transaction) {
        const entity = this.repo.create(transaction.toProps());
        const saved = await this.repo.save(entity);
        return this.toDomain(saved);
    }
    async update(transaction) {
        const props = transaction.toProps();
        await this.repo.update(props.id, {
            status: props.status, wompiTransactionId: props.wompiTransactionId, updatedAt: props.updatedAt,
        });
        const updated = await this.repo.findOneOrFail({ where: { id: props.id } });
        return this.toDomain(updated);
    }
    toDomain(e) {
        return new transaction_entity_1.Transaction({ id: e.id, reference: e.reference, productId: e.productId,
            customerId: e.customerId, amountInCents: e.amountInCents, baseFeeInCents: e.baseFeeInCents,
            deliveryFeeInCents: e.deliveryFeeInCents, totalInCents: e.totalInCents,
            status: e.status, wompiTransactionId: e.wompiTransactionId,
            createdAt: e.createdAt, updatedAt: e.updatedAt });
    }
};
exports.TransactionRepository = TransactionRepository;
exports.TransactionRepository = TransactionRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transaction_orm_entity_1.TransactionOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TransactionRepository);
//# sourceMappingURL=transaction.repository.js.map