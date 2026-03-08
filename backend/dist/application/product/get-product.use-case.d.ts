import { ProductRepositoryPort } from '../../domain/product/product.repository.port';
import { ProductNotFoundError } from '../../shared/errors/domain.errors';
import { Result } from '../../shared/result/result';
import { Product } from '../../domain/product/product.entity';
export declare class GetProductUseCase {
    private readonly productRepo;
    constructor(productRepo: ProductRepositoryPort);
    execute(id: string): Promise<Result<Product, ProductNotFoundError>>;
}
