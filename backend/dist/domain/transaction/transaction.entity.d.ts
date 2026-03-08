export declare enum TransactionStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    DECLINED = "DECLINED",
    VOIDED = "VOIDED",
    ERROR = "ERROR"
}
export interface TransactionProps {
    id: string;
    reference: string;
    productId: string;
    customerId: string;
    amountInCents: number;
    baseFeeInCents: number;
    deliveryFeeInCents: number;
    totalInCents: number;
    status: TransactionStatus;
    wompiTransactionId?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class Transaction {
    readonly id: string;
    readonly reference: string;
    readonly productId: string;
    readonly customerId: string;
    readonly amountInCents: number;
    readonly baseFeeInCents: number;
    readonly deliveryFeeInCents: number;
    readonly totalInCents: number;
    private _status;
    private _wompiTransactionId?;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    static readonly BASE_FEE_IN_CENTS = 300000;
    static readonly DELIVERY_FEE_IN_CENTS = 150000;
    constructor(props: TransactionProps);
    get status(): TransactionStatus;
    get wompiTransactionId(): string | undefined;
    isPending(): boolean;
    approve(wompiId: string): Transaction;
    decline(wompiId: string): Transaction;
    markAsError(): Transaction;
    toProps(): TransactionProps;
}
