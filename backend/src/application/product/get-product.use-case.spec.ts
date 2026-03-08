import { GetProductUseCase } from './get-product.use-case';
import { Ok, Err } from '../../shared/result/result';

const mockRepo = { findById: jest.fn() };

describe('GetProductUseCase', () => {
  let useCase: GetProductUseCase;
  beforeEach(() => { jest.clearAllMocks(); useCase = new GetProductUseCase(mockRepo as any); });

  it('returns product when found', async () => {
    const product = { id: '1', name: 'iPad', stock: 5 };
    mockRepo.findById.mockResolvedValue(product);
    const result = await useCase.execute('1');
    expect(result.isOk()).toBe(true);
    expect((result as Ok<any>).value).toEqual(product);
  });

  it('returns failure when product not found', async () => {
    mockRepo.findById.mockResolvedValue(null);
    const result = await useCase.execute('999');
    expect(result.isOk()).toBe(false);
    expect((result as Err<any>).error.message).toMatch(/999/);
  });

  it('calls repository with correct id', async () => {
    mockRepo.findById.mockResolvedValue({ id: 'abc', name: 'Test' });
    await useCase.execute('abc');
    expect(mockRepo.findById).toHaveBeenCalledWith('abc');
  });
});