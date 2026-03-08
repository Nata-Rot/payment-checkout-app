import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionOrmEntity } from '../infrastructure/database/entities/transaction.orm-entity';
import { DeliveryOrmEntity } from '../infrastructure/database/entities/delivery.orm-entity';
import { TransactionRepository } from '../infrastructure/database/repositories/transaction.repository';
import { DeliveryRepository } from '../infrastructure/database/repositories/delivery.repository';
import { TransactionRepositoryPort } from '../domain/transaction/transaction.repository.port';
import { DeliveryRepositoryPort } from '../domain/delivery/delivery.repository.port';
import { CreateTransactionUseCase } from '../application/transaction/create-transaction.use-case';
import { GetTransactionUseCase } from '../application/transaction/get-transaction.use-case';
import { ProcessPaymentUseCase } from '../application/payment/process-payment.use-case';
import { WompiAdapter } from '../infrastructure/external/wompi/wompi.adapter';
import { PaymentPort } from '../domain/payment/payment.port';
import { TransactionController } from '../infrastructure/http/controllers/transaction.controller';
import { DeliveryController } from '../infrastructure/http/controllers/delivery.controller';
import { ProductModule } from './product.module';
import { CustomerModule } from './customer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionOrmEntity, DeliveryOrmEntity]),
    ProductModule,
    CustomerModule,
  ],
  controllers: [TransactionController, DeliveryController],
  providers: [
    CreateTransactionUseCase, GetTransactionUseCase, ProcessPaymentUseCase,
    { provide: TransactionRepositoryPort, useClass: TransactionRepository },
    { provide: DeliveryRepositoryPort, useClass: DeliveryRepository },
    { provide: PaymentPort, useClass: WompiAdapter },
  ],
})
export class TransactionModule {}
