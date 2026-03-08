import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductOrmEntity } from '../entities/product.orm-entity';
import { ProductRepositoryPort } from '../../../domain/product/product.repository.port';
import { Product } from '../../../domain/product/product.entity';

@Injectable()
export class ProductRepository implements ProductRepositoryPort {
  constructor(@InjectRepository(ProductOrmEntity) private readonly repo: Repository<ProductOrmEntity>) {}

  async findAll(): Promise<Product[]> {
    const items = await this.repo.find({ order: { createdAt: 'ASC' } });
    return items.map(this.toDomain);
  }
  async findById(id: string): Promise<Product | null> {
    const e = await this.repo.findOne({ where: { id } });
    return e ? this.toDomain(e) : null;
  }
  async save(product: Product): Promise<Product> {
    const entity = this.repo.create(product.toProps());
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }
  async decrementStock(productId: string): Promise<Product> {
    await this.repo.decrement({ id: productId }, 'stock', 1);
    const updated = await this.repo.findOneOrFail({ where: { id: productId } });
    return this.toDomain(updated);
  }
  private toDomain(e: ProductOrmEntity): Product {
    return new Product({ id: e.id, name: e.name, description: e.description,
      priceInCents: e.priceInCents, stock: e.stock, imageUrl: e.imageUrl,
      createdAt: e.createdAt, updatedAt: e.updatedAt });
  }
}
