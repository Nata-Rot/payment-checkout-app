"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const transaction_orm_entity_1 = require("../infrastructure/database/entities/transaction.orm-entity");
const delivery_orm_entity_1 = require("../infrastructure/database/entities/delivery.orm-entity");
const transaction_repository_1 = require("../infrastructure/database/repositories/transaction.repository");
const delivery_repository_1 = require("../infrastructure/database/repositories/delivery.repository");
const transaction_repository_port_1 = require("../domain/transaction/transaction.repository.port");
const delivery_repository_port_1 = require("../domain/delivery/delivery.repository.port");
const create_transaction_use_case_1 = require("../application/transaction/create-transaction.use-case");
const get_transaction_use_case_1 = require("../application/transaction/get-transaction.use-case");
const process_payment_use_case_1 = require("../application/payment/process-payment.use-case");
const wompi_adapter_1 = require("../infrastructure/external/wompi/wompi.adapter");
const payment_port_1 = require("../domain/payment/payment.port");
const transaction_controller_1 = require("../infrastructure/http/controllers/transaction.controller");
const delivery_controller_1 = require("../infrastructure/http/controllers/delivery.controller");
const product_module_1 = require("./product.module");
const customer_module_1 = require("./customer.module");
let TransactionModule = class TransactionModule {
};
exports.TransactionModule = TransactionModule;
exports.TransactionModule = TransactionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([transaction_orm_entity_1.TransactionOrmEntity, delivery_orm_entity_1.DeliveryOrmEntity]),
            product_module_1.ProductModule,
            customer_module_1.CustomerModule,
        ],
        controllers: [transaction_controller_1.TransactionController, delivery_controller_1.DeliveryController],
        providers: [
            create_transaction_use_case_1.CreateTransactionUseCase, get_transaction_use_case_1.GetTransactionUseCase, process_payment_use_case_1.ProcessPaymentUseCase,
            { provide: transaction_repository_port_1.TransactionRepositoryPort, useClass: transaction_repository_1.TransactionRepository },
            { provide: delivery_repository_port_1.DeliveryRepositoryPort, useClass: delivery_repository_1.DeliveryRepository },
            { provide: payment_port_1.PaymentPort, useClass: wompi_adapter_1.WompiAdapter },
        ],
    })
], TransactionModule);
//# sourceMappingURL=transaction.module.js.map