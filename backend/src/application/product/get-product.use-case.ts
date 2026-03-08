import { Injectable } from '@nestjs/common';
import { ProductRepositoryPort } from '../../domain/product/product.repository.port';
import { ProductNotFoundError } from '../../shared/errors/domain.errors';
import { Result, ok, err } from '../../shared/result/result';
import { Product } from '../../domain/product/product.entity';

@Injectable()
export class GetProductUseCase {
  constructor(private readonly productRepo: ProductRepositoryPort) {}
  async execute(id: string): Promise<Result<Product, ProductNotFoundError>> {
    const product = await this.productRepo.findById(id);
    if (!product) return err(new ProductNotFoundError(id));
    return ok(product);
  }
}
