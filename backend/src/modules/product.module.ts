import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOrmEntity } from '../infrastructure/database/entities/product.orm-entity';
import { ProductRepository } from '../infrastructure/database/repositories/product.repository';
import { ProductRepositoryPort } from '../domain/product/product.repository.port';
import { GetProductsUseCase } from '../application/product/get-products.use-case';
import { GetProductUseCase } from '../application/product/get-product.use-case';
import { ProductController } from '../infrastructure/http/controllers/product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrmEntity])],
  controllers: [ProductController],
  providers: [
    GetProductsUseCase, GetProductUseCase,
    { provide: ProductRepositoryPort, useClass: ProductRepository },
  ],
  exports: [ProductRepositoryPort],
})
export class ProductModule {}
