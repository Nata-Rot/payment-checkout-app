import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { DeliveryRepositoryPort } from '../../../domain/delivery/delivery.repository.port';

@Controller('api/v1/deliveries')
export class DeliveryController {
  constructor(private readonly deliveryRepo: DeliveryRepositoryPort) {}

  @Get('transaction/:transactionId')
  async findByTransaction(@Param('transactionId') transactionId: string) {
    const delivery = await this.deliveryRepo.findByTransactionId(transactionId);
    if (!delivery) throw new NotFoundException('No delivery found for transaction ' + transactionId);
    return { data: delivery.toProps() };
  }
}
