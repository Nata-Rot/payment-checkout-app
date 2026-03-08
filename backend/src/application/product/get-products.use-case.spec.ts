import { GetProductsUseCase } from './get-products.use-case';
import { Ok, Err } from '../../shared/result/result';

const mockRepo = { findAll: jest.fn() };

describe('GetProductsUseCase', () => {
  let useCase: GetProductsUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new GetProductsUseCase(mockRepo as any);
  });

  it('returns list of products on success', async () => {
    const products = [
      { id: '1', name: 'iPad', priceInCents: 500000000, stock: 10 },
      { id: '2', name: 'MacBook', priceInCents: 800000000, stock: 5 },
    ];
    mockRepo.findAll.mockResolvedValue(products);

    const result = await useCase.execute();

    expect(result.isOk()).toBe(true);
    expect((result as Ok).value).toHaveLength(2);
    expect(mockRepo.findAll).toHaveBeenCalledTimes(1);
  });

  it('returns empty list when no products exist', async () => {
    mockRepo.findAll.mockResolvedValue([]);
    const result = await useCase.execute();
    expect(result.isOk()).toBe(true);
    expect((result as Ok).value).toHaveLength(0);
  });

  it('returns failure when repository throws', async () => {
    mockRepo.findAll.mockRejectedValue(new Error('DB connection error'));
    const result = await useCase.execute();
    expect(result.isOk()).toBe(false);
  });
});