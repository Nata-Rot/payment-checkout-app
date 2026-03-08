import { UpsertCustomerUseCase } from './upsert-customer.use-case';
import { Ok } from '../../shared/result/result';

const mockRepo = { findByEmail: jest.fn(), save: jest.fn() };

describe('UpsertCustomerUseCase', () => {
  let useCase: UpsertCustomerUseCase;
  beforeEach(() => { jest.clearAllMocks(); useCase = new UpsertCustomerUseCase(mockRepo as any); });

  const input = { name: 'John Doe', email: 'john@example.com', phone: '3001234567' };

  it('creates new customer when email not found', async () => {
    mockRepo.findByEmail.mockResolvedValue(null);
    mockRepo.save.mockResolvedValue({ id: 'cust-1', ...input });
    const result = await useCase.execute(input);
    expect(result.isOk()).toBe(true);
    expect(mockRepo.save).toHaveBeenCalledTimes(1);
  });

  it('returns existing customer when email found', async () => {
    const existing = { id: 'cust-1', ...input };
    mockRepo.findByEmail.mockResolvedValue(existing);
    const result = await useCase.execute(input);
    expect(result.isOk()).toBe(true);
    expect(mockRepo.save).not.toHaveBeenCalled();
  });

  it('fails when repository throws', async () => {
    mockRepo.findByEmail.mockRejectedValue(new Error('DB error'));
    const result = await useCase.execute(input);
    expect(result.isOk()).toBe(false);
  });
});