import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerOrmEntity } from '../infrastructure/database/entities/customer.orm-entity';
import { CustomerRepository } from '../infrastructure/database/repositories/customer.repository';
import { CustomerRepositoryPort } from '../domain/customer/customer.repository.port';
import { UpsertCustomerUseCase } from '../application/customer/upsert-customer.use-case';
import { CustomerController } from '../infrastructure/http/controllers/customer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerOrmEntity])],
  controllers: [CustomerController],
  providers: [
    UpsertCustomerUseCase,
    { provide: CustomerRepositoryPort, useClass: CustomerRepository },
  ],
  exports: [CustomerRepositoryPort],
})
export class CustomerModule {}
