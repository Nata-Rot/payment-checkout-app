import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UpsertCustomerUseCase } from '../../../application/customer/upsert-customer.use-case';
import { CreateCustomerDto } from '../dtos/create-customer.dto';

@Controller('api/v1/customers')
export class CustomerController {
  constructor(private readonly upsertCustomer: UpsertCustomerUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateCustomerDto) {
    const result = await this.upsertCustomer.execute(dto);
    if (result.isErr()) throw result.error;
    return { data: result.value.toProps() };
  }
}
