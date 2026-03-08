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
exports.DeliveryRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const delivery_orm_entity_1 = require("../entities/delivery.orm-entity");
const delivery_entity_1 = require("../../../domain/delivery/delivery.entity");
let DeliveryRepository = class DeliveryRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async findByTransactionId(transactionId) {
        const e = await this.repo.findOne({ where: { transactionId } });
        return e ? this.toDomain(e) : null;
    }
    async save(delivery) {
        const entity = this.repo.create(delivery.toProps());
        const saved = await this.repo.save(entity);
        return this.toDomain(saved);
    }
    async update(delivery) {
        await this.repo.update(delivery.id, { status: delivery.status });
        const updated = await this.repo.findOneOrFail({ where: { id: delivery.id } });
        return this.toDomain(updated);
    }
    toDomain(e) {
        return new delivery_entity_1.Delivery({ id: e.id, transactionId: e.transactionId, customerId: e.customerId,
            productId: e.productId, address: e.address, city: e.city, department: e.department,
            postalCode: e.postalCode, status: e.status,
            createdAt: e.createdAt, updatedAt: e.updatedAt });
    }
};
exports.DeliveryRepository = DeliveryRepository;
exports.DeliveryRepository = DeliveryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(delivery_orm_entity_1.DeliveryOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DeliveryRepository);
//# sourceMappingURL=delivery.repository.js.map