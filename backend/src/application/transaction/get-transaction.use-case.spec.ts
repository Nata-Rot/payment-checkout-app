import { GetTransactionUseCase } from './get-transaction.use-case';
import { Ok } from '../../shared/result/result';

const mockRepo = { findById: jest.fn() };

describe('GetTransactionUseCase', () => {
  let useCase: GetTransactionUseCase;
  beforeEach(() => { jest.clearAllMocks(); useCase = new GetTransactionUseCase(mockRepo as any); });

  it('returns transaction when found', async () => {
    const tx = { id: 'tx-1', reference: 'TRX-123', status: 'PENDING' };
    mockRepo.findById.mockResolvedValue(tx);
    const result = await useCase.execute('tx-1');
    expect(result.isOk()).toBe(true);
    expect((result as Ok<any>).value.reference).toBe('TRX-123');
  });

  it('fails when transaction not found', async () => {
    mockRepo.findById.mockResolvedValue(null);
    const result = await useCase.execute('INVALID');
    expect(result.isOk()).toBe(false);
  });
});