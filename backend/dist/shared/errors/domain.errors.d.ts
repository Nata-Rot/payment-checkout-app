export declare class ProductNotFoundError extends Error {
    constructor(id: string);
}
export declare class InsufficientStockError extends Error {
    constructor(productId: string, available: number);
}
export declare class TransactionNotFoundError extends Error {
    constructor(id: string);
}
export declare class CustomerNotFoundError extends Error {
    constructor(id: string);
}
export declare class PaymentGatewayError extends Error {
    constructor(message: string);
}
export declare class InvalidTransactionStateError extends Error {
    constructor(current: string, expected: string);
}
