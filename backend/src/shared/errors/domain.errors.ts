export class ProductNotFoundError extends Error {
  constructor(id: string) { super('Product with id ' + id + ' not found'); this.name = 'ProductNotFoundError'; }
}
export class InsufficientStockError extends Error {
  constructor(productId: string, available: number) { super('Insufficient stock for product ' + productId + '. Available: ' + available); this.name = 'InsufficientStockError'; }
}
export class TransactionNotFoundError extends Error {
  constructor(id: string) { super('Transaction with id ' + id + ' not found'); this.name = 'TransactionNotFoundError'; }
}
export class CustomerNotFoundError extends Error {
  constructor(id: string) { super('Customer ' + id + ' not found'); this.name = 'CustomerNotFoundError'; }
}
export class PaymentGatewayError extends Error {
  constructor(message: string) { super('Payment gateway error: ' + message); this.name = 'PaymentGatewayError'; }
}
export class InvalidTransactionStateError extends Error {
  constructor(current: string, expected: string) { super('Invalid state. Current: ' + current + ', Expected: ' + expected); this.name = 'InvalidTransactionStateError'; }
}
