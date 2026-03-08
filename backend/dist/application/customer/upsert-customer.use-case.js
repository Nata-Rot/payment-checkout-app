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
exports.UpsertCustomerUseCase = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const customer_repository_port_1 = require("../../domain/customer/customer.repository.port");
const customer_entity_1 = require("../../domain/customer/customer.entity");
const result_1 = require("../../shared/result/result");
let UpsertCustomerUseCase = class UpsertCustomerUseCase {
    customerRepo;
    constructor(customerRepo) {
        this.customerRepo = customerRepo;
    }
    async execute(input) {
        try {
            const existing = await this.customerRepo.findByEmail(input.email);
            if (existing)
                return (0, result_1.ok)(existing);
            const customer = new customer_entity_1.Customer({
                id: (0, uuid_1.v4)(), email: input.email,
                fullName: input.fullName, phone: input.phone, createdAt: new Date(),
            });
            const saved = await this.customerRepo.save(customer);
            return (0, result_1.ok)(saved);
        }
        catch (error) {
            return (0, result_1.err)(error instanceof Error ? error : new Error(String(error)));
        }
    }
};
exports.UpsertCustomerUseCase = UpsertCustomerUseCase;
exports.UpsertCustomerUseCase = UpsertCustomerUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [customer_repository_port_1.CustomerRepositoryPort])
], UpsertCustomerUseCase);
//# sourceMappingURL=upsert-customer.use-case.js.map