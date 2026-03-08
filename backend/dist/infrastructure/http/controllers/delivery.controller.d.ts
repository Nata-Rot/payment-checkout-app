import { DeliveryRepositoryPort } from '../../../domain/delivery/delivery.repository.port';
export declare class DeliveryController {
    private readonly deliveryRepo;
    constructor(deliveryRepo: DeliveryRepositoryPort);
    findByTransaction(transactionId: string): Promise<{
        data: import("../../../domain/delivery/delivery.entity").DeliveryProps;
    }>;
}
