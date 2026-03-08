import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { GetProductsUseCase } from '../../../application/product/get-products.use-case';
import { GetProductUseCase } from '../../../application/product/get-product.use-case';

@Controller('api/v1/products')
export class ProductController {
  constructor(
    private readonly getProducts: GetProductsUseCase,
    private readonly getProduct: GetProductUseCase,
  ) {}

  @Get()
  async findAll() {
    const result = await this.getProducts.execute();
    if (result.isErr()) throw result.error;
    return { data: result.value.map(p => p.toProps()) };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.getProduct.execute(id);
    if (result.isErr()) throw new NotFoundException(result.error.message);
    return { data: result.value.toProps() };
  }
}
