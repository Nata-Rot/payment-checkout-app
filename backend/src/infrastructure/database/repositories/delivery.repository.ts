import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryOrmEntity } from '../entities/delivery.orm-entity';
import { DeliveryRepositoryPort } from '../../../domain/delivery/delivery.repository.port';
import { Delivery, DeliveryStatus } from '../../../domain/delivery/delivery.entity';

@Injectable()
export class DeliveryRepository implements DeliveryRepositoryPort {
  constructor(@InjectRepository(DeliveryOrmEntity) private readonly repo: Repository<DeliveryOrmEntity>) {}

  async findByTransactionId(transactionId: string): Promise<Delivery | null> {
    const e = await this.repo.findOne({ where: { transactionId } });
    return e ? this.toDomain(e) : null;
  }
  async save(delivery: Delivery): Promise<Delivery> {
    const entity = this.repo.create(delivery.toProps());
    const saved = await this.repo.save(entity);
    return this.toDomain(saved);
  }
  async update(delivery: Delivery): Promise<Delivery> {
    await this.repo.update(delivery.id, { status: delivery.status });
    const updated = await this.repo.findOneOrFail({ where: { id: delivery.id } });
    return this.toDomain(updated);
  }
  private toDomain(e: DeliveryOrmEntity): Delivery {
    return new Delivery({ id: e.id, transactionId: e.transactionId, customerId: e.customerId,
      productId: e.productId, address: e.address, city: e.city, department: e.department,
      postalCode: e.postalCode, status: e.status as DeliveryStatus,
      createdAt: e.createdAt, updatedAt: e.updatedAt });
  }
}
