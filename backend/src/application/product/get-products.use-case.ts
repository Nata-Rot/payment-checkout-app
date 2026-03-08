import { Injectable } from '@nestjs/common';
import { ProductRepositoryPort } from '../../domain/product/product.repository.port';
import { Result, ok, err } from '../../shared/result/result';
import { Product } from '../../domain/product/product.entity';

@Injectable()
export class GetProductsUseCase {
  constructor(private readonly productRepo: ProductRepositoryPort) {}
  async execute(): Promise<Result<Product[]>> {
    try {
      const products = await this.productRepo.findAll();
      return ok(products);
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)));
    }
  }
}
