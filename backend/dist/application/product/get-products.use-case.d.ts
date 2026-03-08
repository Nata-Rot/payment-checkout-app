import { ProductRepositoryPort } from '../../domain/product/product.repository.port';
import { Result } from '../../shared/result/result';
import { Product } from '../../domain/product/product.entity';
export declare class GetProductsUseCase {
    private readonly productRepo;
    constructor(productRepo: ProductRepositoryPort);
    execute(): Promise<Result<Product[]>>;
}
