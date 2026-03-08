"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const customer_orm_entity_1 = require("../infrastructure/database/entities/customer.orm-entity");
const customer_repository_1 = require("../infrastructure/database/repositories/customer.repository");
const customer_repository_port_1 = require("../domain/customer/customer.repository.port");
const upsert_customer_use_case_1 = require("../application/customer/upsert-customer.use-case");
const customer_controller_1 = require("../infrastructure/http/controllers/customer.controller");
let CustomerModule = class CustomerModule {
};
exports.CustomerModule = CustomerModule;
exports.CustomerModule = CustomerModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([customer_orm_entity_1.CustomerOrmEntity])],
        controllers: [customer_controller_1.CustomerController],
        providers: [
            upsert_customer_use_case_1.UpsertCustomerUseCase,
            { provide: customer_repository_port_1.CustomerRepositoryPort, useClass: customer_repository_1.CustomerRepository },
        ],
        exports: [customer_repository_port_1.CustomerRepositoryPort],
    })
], CustomerModule);
//# sourceMappingURL=customer.module.js.map