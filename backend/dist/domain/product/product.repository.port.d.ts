import { Product } from './product.entity';
export declare abstract class ProductRepositoryPort {
    abstract findAll(): Promise<Product[]>;
    abstract findById(id: string): Promise<Product | null>;
    abstract save(product: Product): Promise<Product>;
    abstract decrementStock(productId: string): Promise<Product>;
}
