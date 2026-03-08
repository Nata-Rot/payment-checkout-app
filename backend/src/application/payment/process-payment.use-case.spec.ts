import { ProcessPaymentUseCase } from './process-payment.use-case';
import { Ok, Err } from '../../shared/result/result';
import { TransactionStatus } from '../../domain/transaction/transaction.entity';

const mockPaymentPort = { createTransaction: jest.fn() };
const mockTxRepo = { findById: jest.fn(), update: jest.fn() };
const mockProductRepo = { decrementStock: jest.fn() };
const mockDeliveryRepo = { save: jest.fn() };

const makePendingTx = () => ({
  id: 'tx-1', reference: 'TRX-123', status: TransactionStatus.PENDING,
  totalInCents: 520000000, productId: 'prod-1', customerId: 'cust-1',
  isPending: () => true,
  approve: (wId: string) => ({ id: 'tx-1', reference: 'TRX-123', status: TransactionStatus.APPROVED, wompiTransactionId: wId }),
  decline: (wId: string) => ({ id: 'tx-1', reference: 'TRX-123', status: TransactionStatus.DECLINED, wompiTransactionId: wId }),
  markAsError: () => ({ id: 'tx-1', status: TransactionStatus.ERROR }),
});

const validInput = {
  transactionId: 'tx-1', cardToken: 'tok_123', installments: 1,
  deliveryAddress: 'Calle 1 # 2-3', deliveryCity: 'Bogota',
  deliveryDepartment: 'Cundinamarca', deliveryPostalCode: '110111',
  customerEmail: 'test@example.com',
};

describe('ProcessPaymentUseCase', () => {
  let useCase: ProcessPaymentUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new ProcessPaymentUseCase(
      mockPaymentPort as any,
      mockTxRepo as any,
      mockProductRepo as any,
      mockDeliveryRepo as any,
    );
  });

  it('returns APPROVED and decrements stock on successful payment', async () => {
    mockTxRepo.findById.mockResolvedValue(makePendingTx());
    mockPaymentPort.createTransaction.mockResolvedValue({ id: 'w-tx-1', status: 'APPROVED' });
    mockTxRepo.update.mockResolvedValue(undefined);
    mockProductRepo.decrementStock.mockResolvedValue(undefined);
    mockDeliveryRepo.save.mockResolvedValue(undefined);

    const result = await useCase.execute(validInput);

    expect(result.isOk()).toBe(true);
    expect((result as Ok).value.status).toBe(TransactionStatus.APPROVED);
    expect(mockProductRepo.decrementStock).toHaveBeenCalledWith('prod-1');
    expect(mockDeliveryRepo.save).toHaveBeenCalledTimes(1);
  });

  it('returns DECLINED and does not decrement stock', async () => {
    mockTxRepo.findById.mockResolvedValue(makePendingTx());
    mockPaymentPort.createTransaction.mockResolvedValue({ id: 'w-tx-2', status: 'DECLINED' });
    mockTxRepo.update.mockResolvedValue(undefined);

    const result = await useCase.execute(validInput);

    expect(result.isOk()).toBe(true);
    expect((result as Ok).value.status).toBe(TransactionStatus.DECLINED);
    expect(mockProductRepo.decrementStock).not.toHaveBeenCalled();
    expect(mockDeliveryRepo.save).not.toHaveBeenCalled();
  });

  it('fails when transaction not found', async () => {
    mockTxRepo.findById.mockResolvedValue(null);
    const result = await useCase.execute(validInput);
    expect(result.isOk()).toBe(false);
  });

  it('fails when transaction is not PENDING', async () => {
    const nonPendingTx = { ...makePendingTx(), isPending: () => false, status: TransactionStatus.APPROVED };
    mockTxRepo.findById.mockResolvedValue(nonPendingTx);
    const result = await useCase.execute(validInput);
    expect(result.isOk()).toBe(false);
  });

  it('returns error result when payment gateway throws', async () => {
    mockTxRepo.findById.mockResolvedValue(makePendingTx());
    mockPaymentPort.createTransaction.mockRejectedValue(new Error('Gateway timeout'));
    mockTxRepo.update.mockResolvedValue(undefined);

    const result = await useCase.execute(validInput);
    expect(result.isOk()).toBe(false);
  });
});