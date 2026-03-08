import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/product.module';
import { CustomerModule } from './modules/customer.module';
import { TransactionModule } from './modules/transaction.module';
import { ProductOrmEntity } from './infrastructure/database/entities/product.orm-entity';
import { CustomerOrmEntity } from './infrastructure/database/entities/customer.orm-entity';
import { TransactionOrmEntity } from './infrastructure/database/entities/transaction.orm-entity';
import { DeliveryOrmEntity } from './infrastructure/database/entities/delivery.orm-entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        entities: [ProductOrmEntity, CustomerOrmEntity, TransactionOrmEntity, DeliveryOrmEntity],
        synchronize: config.get('NODE_ENV') !== 'production',
        ssl: config.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
      }),
    }),
    ProductModule,
    CustomerModule,
    TransactionModule,
  ],
})
export class AppModule {}
