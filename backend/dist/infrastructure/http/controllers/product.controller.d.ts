import { GetProductsUseCase } from '../../../application/product/get-products.use-case';
import { GetProductUseCase } from '../../../application/product/get-product.use-case';
export declare class ProductController {
    private readonly getProducts;
    private readonly getProduct;
    constructor(getProducts: GetProductsUseCase, getProduct: GetProductUseCase);
    findAll(): Promise<{
        data: import("../../../domain/product/product.entity").ProductProps[];
    }>;
    findOne(id: string): Promise<{
        data: import("../../../domain/product/product.entity").ProductProps;
    }>;
}
