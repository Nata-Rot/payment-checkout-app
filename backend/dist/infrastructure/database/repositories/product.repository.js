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
exports.ProductRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_orm_entity_1 = require("../entities/product.orm-entity");
const product_entity_1 = require("../../../domain/product/product.entity");
let ProductRepository = class ProductRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async findAll() {
        const items = await this.repo.find({ order: { createdAt: 'ASC' } });
        return items.map(this.toDomain);
    }
    async findById(id) {
        const e = await this.repo.findOne({ where: { id } });
        return e ? this.toDomain(e) : null;
    }
    async save(product) {
        const entity = this.repo.create(product.toProps());
        const saved = await this.repo.save(entity);
        return this.toDomain(saved);
    }
    async decrementStock(productId) {
        await this.repo.decrement({ id: productId }, 'stock', 1);
        const updated = await this.repo.findOneOrFail({ where: { id: productId } });
        return this.toDomain(updated);
    }
    toDomain(e) {
        return new product_entity_1.Product({ id: e.id, name: e.name, description: e.description,
            priceInCents: e.priceInCents, stock: e.stock, imageUrl: e.imageUrl,
            createdAt: e.createdAt, updatedAt: e.updatedAt });
    }
};
exports.ProductRepository = ProductRepository;
exports.ProductRepository = ProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_orm_entity_1.ProductOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductRepository);
//# sourceMappingURL=product.repository.js.map