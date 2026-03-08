import { CreateTransactionUseCase } from './create-transaction.use-case';
import { Ok, Err } from '../../shared/result/result';
import { TransactionStatus } from '../../domain/transaction/transaction.entity';

const mockTxRepo = { save: jest.fn() };
const mockProductRepo = { findById: jest.fn() };
const mockCustomerRepo = { findById: jest.fn() };

describe('CreateTransactionUseCase', () => {
  let useCase: CreateTransactionUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new CreateTransactionUseCase(
      mockTxRepo as any,
      mockProductRepo as any,
      mockCustomerRepo as any,
    );
  });

  const validInput = { productId: 'prod-1', customerId: 'cust-1' };

  it('creates a PENDING transaction when product and customer exist', async () => {
    const product = {
      id: 'prod-1', priceInCents: 500000000, stock: 5,
      hasStock: () => true,
    };
    const customer = { id: 'cust-1', email: 'test@example.com' };
    const savedTx = {
      id: 'tx-1', reference: 'TRX-123', status: TransactionStatus.PENDING,
    };
    mockProductRepo.findById.mockResolvedValue(product);
    mockCustomerRepo.findById.mockResolvedValue(customer);
    mockTxRepo.save.mockResolvedValue(savedTx);

    const result = await useCase.execute(validInput);

    expect(result.isOk()).toBe(true);
    expect((result as Ok).value.status).toBe(TransactionStatus.PENDING);
    expect(mockTxRepo.save).toHaveBeenCalledTimes(1);
  });

  it('fails when product does not exist', async () => {
    mockProductRepo.findById.mockResolvedValue(null);
    const result = await useCase.execute(validInput);
    expect(result.isOk()).toBe(false);
    expect((result as Err).error.message).toMatch(/prod-1/);
  });

  it('fails when product has no stock', async () => {
    const product = {
      id: 'prod-1', priceInCents: 500000000, stock: 0,
      hasStock: () => false,
    };
    mockProductRepo.findById.mockResolvedValue(product);
    const result = await useCase.execute(validInput);
    expect(result.isOk()).toBe(false);
    expect((result as Err).error).toBeDefined();
  });

  it('fails when customer does not exist', async () => {
    const product = { id: 'prod-1', priceInCents: 500000000, stock: 3, hasStock: () => true };
    mockProductRepo.findById.mockResolvedValue(product);
    mockCustomerRepo.findById.mockResolvedValue(null);

    const result = await useCase.execute(validInput);
    expect(result.isOk()).toBe(false);
  });
});