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
exports.ProductOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let ProductOrmEntity = class ProductOrmEntity {
    id;
    name;
    description;
    priceInCents;
    stock;
    imageUrl;
    createdAt;
    updatedAt;
};
exports.ProductOrmEntity = ProductOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)('uuid'),
    __metadata("design:type", String)
], ProductOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 120 }),
    __metadata("design:type", String)
], ProductOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ProductOrmEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'price_in_cents', type: 'int' }),
    __metadata("design:type", Number)
], ProductOrmEntity.prototype, "priceInCents", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ProductOrmEntity.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_url', length: 512 }),
    __metadata("design:type", String)
], ProductOrmEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ProductOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ProductOrmEntity.prototype, "updatedAt", void 0);
exports.ProductOrmEntity = ProductOrmEntity = __decorate([
    (0, typeorm_1.Entity)('products')
], ProductOrmEntity);
//# sourceMappingURL=product.orm-entity.js.map