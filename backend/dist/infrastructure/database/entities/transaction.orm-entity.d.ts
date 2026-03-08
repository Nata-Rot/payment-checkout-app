export declare class TransactionOrmEntity {
    id: string;
    reference: string;
    productId: string;
    customerId: string;
    amountInCents: number;
    baseFeeInCents: number;
    deliveryFeeInCents: number;
    totalInCents: number;
    status: string;
    wompiTransactionId?: string;
    createdAt: Date;
    updatedAt: Date;
}
