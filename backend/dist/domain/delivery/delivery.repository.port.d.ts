import { Delivery } from './delivery.entity';
export declare abstract class DeliveryRepositoryPort {
    abstract findByTransactionId(transactionId: string): Promise<Delivery | null>;
    abstract save(delivery: Delivery): Promise<Delivery>;
    abstract update(delivery: Delivery): Promise<Delivery>;
}
