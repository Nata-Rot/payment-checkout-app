import { Transaction, TransactionStatus, TransactionProps } from './transaction.entity';

const makeProps = (): TransactionProps => ({
  id: 'tx-1', reference: 'TRX-123',
  productId: 'prod-1', customerId: 'cust-1',
  amountInCents: 500000000,
  baseFeeInCents: 400000,
  deliveryFeeInCents: 1500000,
  totalInCents: 501900000,
  status: TransactionStatus.PENDING,
  createdAt: new Date(), updatedAt: new Date(),
});

describe('Transaction Entity', () => {
  it('creates a valid transaction', () => {
    const tx = new Transaction(makeProps());
    expect(tx.id).toBe('tx-1');
    expect(tx.status).toBe(TransactionStatus.PENDING);
  });

  it('isPending returns true when PENDING', () => {
    const tx = new Transaction(makeProps());
    expect(tx.isPending()).toBe(true);
  });

  it('isPending returns false when APPROVED', () => {
    const tx = new Transaction({ ...makeProps(), status: TransactionStatus.APPROVED });
    expect(tx.isPending()).toBe(false);
  });

  it('approve returns new transaction with APPROVED status', () => {
    const tx = new Transaction(makeProps());
    const approved = tx.approve('w-tx-1');
    expect(approved.status).toBe(TransactionStatus.APPROVED);
    expect(approved.wompiTransactionId).toBe('w-tx-1');
    expect(tx.status).toBe(TransactionStatus.PENDING); // immutable
  });

  it('decline returns new transaction with DECLINED status', () => {
    const tx = new Transaction(makeProps());
    const declined = tx.decline('w-tx-2');
    expect(declined.status).toBe(TransactionStatus.DECLINED);
  });

  it('markAsError returns new transaction with ERROR status', () => {
    const tx = new Transaction(makeProps());
    const errored = tx.markAsError();
    expect(errored.status).toBe(TransactionStatus.ERROR);
  });

  it('BASE_FEE_IN_CENTS is defined', () => {
    expect(Transaction.BASE_FEE_IN_CENTS).toBeGreaterThan(0);
  });
});