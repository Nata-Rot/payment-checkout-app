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
exports.TransactionOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let TransactionOrmEntity = class TransactionOrmEntity {
    id;
    reference;
    productId;
    customerId;
    amountInCents;
    baseFeeInCents;
    deliveryFeeInCents;
    totalInCents;
    status;
    wompiTransactionId;
    createdAt;
    updatedAt;
};
exports.TransactionOrmEntity = TransactionOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], TransactionOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 100 }),
    __metadata("design:type", String)
], TransactionOrmEntity.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", String)
], TransactionOrmEntity.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    __metadata("design:type", String)
], TransactionOrmEntity.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'amount_in_cents', type: 'int' }),
    __metadata("design:type", Number)
], TransactionOrmEntity.prototype, "amountInCents", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'base_fee_in_cents', type: 'int' }),
    __metadata("design:type", Number)
], TransactionOrmEntity.prototype, "baseFeeInCents", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'delivery_fee_in_cents', type: 'int' }),
    __metadata("design:type", Number)
], TransactionOrmEntity.prototype, "deliveryFeeInCents", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_in_cents', type: 'int' }),
    __metadata("design:type", Number)
], TransactionOrmEntity.prototype, "totalInCents", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, default: 'PENDING' }),
    __metadata("design:type", String)
], TransactionOrmEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'wompi_transaction_id', nullable: true, length: 150 }),
    __metadata("design:type", String)
], TransactionOrmEntity.prototype, "wompiTransactionId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], TransactionOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], TransactionOrmEntity.prototype, "updatedAt", void 0);
exports.TransactionOrmEntity = TransactionOrmEntity = __decorate([
    (0, typeorm_1.Entity)('transactions')
], TransactionOrmEntity);
//# sourceMappingURL=transaction.orm-entity.js.map