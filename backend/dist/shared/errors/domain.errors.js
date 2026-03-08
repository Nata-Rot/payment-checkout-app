"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTransactionStateError = exports.PaymentGatewayError = exports.CustomerNotFoundError = exports.TransactionNotFoundError = exports.InsufficientStockError = exports.ProductNotFoundError = void 0;
class ProductNotFoundError extends Error {
    constructor(id) { super('Product with id ' + id + ' not found'); this.name = 'ProductNotFoundError'; }
}
exports.ProductNotFoundError = ProductNotFoundError;
class InsufficientStockError extends Error {
    constructor(productId, available) { super('Insufficient stock for product ' + productId + '. Available: ' + available); this.name = 'InsufficientStockError'; }
}
exports.InsufficientStockError = InsufficientStockError;
class TransactionNotFoundError extends Error {
    constructor(id) { super('Transaction with id ' + id + ' not found'); this.name = 'TransactionNotFoundError'; }
}
exports.TransactionNotFoundError = TransactionNotFoundError;
class CustomerNotFoundError extends Error {
    constructor(id) { super('Customer ' + id + ' not found'); this.name = 'CustomerNotFoundError'; }
}
exports.CustomerNotFoundError = CustomerNotFoundError;
class PaymentGatewayError extends Error {
    constructor(message) { super('Payment gateway error: ' + message); this.name = 'PaymentGatewayError'; }
}
exports.PaymentGatewayError = PaymentGatewayError;
class InvalidTransactionStateError extends Error {
    constructor(current, expected) { super('Invalid state. Current: ' + current + ', Expected: ' + expected); this.name = 'InvalidTransactionStateError'; }
}
exports.InvalidTransactionStateError = InvalidTransactionStateError;
//# sourceMappingURL=domain.errors.js.map