import { Repository } from 'typeorm';
import { DeliveryOrmEntity } from '../entities/delivery.orm-entity';
import { DeliveryRepositoryPort } from '../../../domain/delivery/delivery.repository.port';
import { Delivery } from '../../../domain/delivery/delivery.entity';
export declare class DeliveryRepository implements DeliveryRepositoryPort {
    private readonly repo;
    constructor(repo: Repository<DeliveryOrmEntity>);
    findByTransactionId(transactionId: string): Promise<Delivery | null>;
    save(delivery: Delivery): Promise<Delivery>;
    update(delivery: Delivery): Promise<Delivery>;
    private toDomain;
}
