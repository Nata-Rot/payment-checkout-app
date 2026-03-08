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
exports.DeliveryOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let DeliveryOrmEntity = class DeliveryOrmEntity {
    id;
    transactionId;
    customerId;
    productId;
    address;
    city;
    department;
    postalCode;
    status;
    createdAt;
    updatedAt;
};
exports.DeliveryOrmEntity = DeliveryOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], DeliveryOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'transaction_id' }),
    __metadata("design:type", String)
], DeliveryOrmEntity.prototype, "transactionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id' }),
    __metadata("design:type", String)
], DeliveryOrmEntity.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", String)
], DeliveryOrmEntity.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 250 }),
    __metadata("design:type", String)
], DeliveryOrmEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], DeliveryOrmEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], DeliveryOrmEntity.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'postal_code', length: 20 }),
    __metadata("design:type", String)
], DeliveryOrmEntity.prototype, "postalCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, default: 'PENDING' }),
    __metadata("design:type", String)
], DeliveryOrmEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], DeliveryOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], DeliveryOrmEntity.prototype, "updatedAt", void 0);
exports.DeliveryOrmEntity = DeliveryOrmEntity = __decorate([
    (0, typeorm_1.Entity)('deliveries')
], DeliveryOrmEntity);
//# sourceMappingURL=delivery.orm-entity.js.map