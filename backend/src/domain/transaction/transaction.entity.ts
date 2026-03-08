export enum TransactionStatus {
  PENDING = 'PENDING', APPROVED = 'APPROVED', DECLINED = 'DECLINED',
  VOIDED = 'VOIDED', ERROR = 'ERROR',
}
export interface TransactionProps {
  id: string; reference: string; productId: string; customerId: string;
  amountInCents: number; baseFeeInCents: number; deliveryFeeInCents: number;
  totalInCents: number; status: TransactionStatus;
  wompiTransactionId?: string; createdAt: Date; updatedAt: Date;
}
export class Transaction {
  readonly id: string; readonly reference: string; readonly productId: string;
  readonly customerId: string; readonly amountInCents: number;
  readonly baseFeeInCents: number; readonly deliveryFeeInCents: number;
  readonly totalInCents: number;
  private _status: TransactionStatus; private _wompiTransactionId?: string;
  readonly createdAt: Date; readonly updatedAt: Date;
  static readonly BASE_FEE_IN_CENTS = 300000;
  static readonly DELIVERY_FEE_IN_CENTS = 150000;
  constructor(props: TransactionProps) {
    this.id = props.id; this.reference = props.reference;
    this.productId = props.productId; this.customerId = props.customerId;
    this.amountInCents = props.amountInCents; this.baseFeeInCents = props.baseFeeInCents;
    this.deliveryFeeInCents = props.deliveryFeeInCents; this.totalInCents = props.totalInCents;
    this._status = props.status; this._wompiTransactionId = props.wompiTransactionId;
    this.createdAt = props.createdAt; this.updatedAt = props.updatedAt;
  }
  get status(): TransactionStatus { return this._status; }
  get wompiTransactionId(): string | undefined { return this._wompiTransactionId; }
  isPending(): boolean { return this._status === TransactionStatus.PENDING; }
  approve(wompiId: string): Transaction {
    return new Transaction({ ...this.toProps(), status: TransactionStatus.APPROVED, wompiTransactionId: wompiId, updatedAt: new Date() });
  }
  decline(wompiId: string): Transaction {
    return new Transaction({ ...this.toProps(), status: TransactionStatus.DECLINED, wompiTransactionId: wompiId, updatedAt: new Date() });
  }
  markAsError(): Transaction {
    return new Transaction({ ...this.toProps(), status: TransactionStatus.ERROR, updatedAt: new Date() });
  }
  toProps(): TransactionProps {
    return { id: this.id, reference: this.reference, productId: this.productId,
      customerId: this.customerId, amountInCents: this.amountInCents,
      baseFeeInCents: this.baseFeeInCents, deliveryFeeInCents: this.deliveryFeeInCents,
      totalInCents: this.totalInCents, status: this._status,
      wompiTransactionId: this._wompiTransactionId, createdAt: this.createdAt, updatedAt: this.updatedAt };
  }
}
