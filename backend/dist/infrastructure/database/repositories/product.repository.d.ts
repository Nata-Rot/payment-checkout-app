import { Repository } from 'typeorm';
import { ProductOrmEntity } from '../entities/product.orm-entity';
import { ProductRepositoryPort } from '../../../domain/product/product.repository.port';
import { Product } from '../../../domain/product/product.entity';
export declare class ProductRepository implements ProductRepositoryPort {
    private readonly repo;
    constructor(repo: Repository<ProductOrmEntity>);
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    save(product: Product): Promise<Product>;
    decrementStock(productId: string): Promise<Product>;
    private toDomain;
}
