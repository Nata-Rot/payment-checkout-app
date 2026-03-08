"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const product_module_1 = require("./modules/product.module");
const customer_module_1 = require("./modules/customer.module");
const transaction_module_1 = require("./modules/transaction.module");
const product_orm_entity_1 = require("./infrastructure/database/entities/product.orm-entity");
const customer_orm_entity_1 = require("./infrastructure/database/entities/customer.orm-entity");
const transaction_orm_entity_1 = require("./infrastructure/database/entities/transaction.orm-entity");
const delivery_orm_entity_1 = require("./infrastructure/database/entities/delivery.orm-entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    type: 'postgres',
                    url: config.get('DATABASE_URL'),
                    entities: [product_orm_entity_1.ProductOrmEntity, customer_orm_entity_1.CustomerOrmEntity, transaction_orm_entity_1.TransactionOrmEntity, delivery_orm_entity_1.DeliveryOrmEntity],
                    synchronize: config.get('NODE_ENV') !== 'production',
                    ssl: config.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
                }),
            }),
            product_module_1.ProductModule,
            customer_module_1.CustomerModule,
            transaction_module_1.TransactionModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map