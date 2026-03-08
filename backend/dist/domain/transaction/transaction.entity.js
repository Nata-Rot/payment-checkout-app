"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = exports.TransactionStatus = void 0;
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["PENDING"] = "PENDING";
    TransactionStatus["APPROVED"] = "APPROVED";
    TransactionStatus["DECLINED"] = "DECLINED";
    TransactionStatus["VOIDED"] = "VOIDED";
    TransactionStatus["ERROR"] = "ERROR";
})(TransactionStatus || (exports.TransactionStatus = TransactionStatus = {}));
class Transaction {
    id;
    reference;
    productId;
    customerId;
    amountInCents;
    baseFeeInCents;
    deliveryFeeInCents;
    totalInCents;
    _status;
    _wompiTransactionId;
    createdAt;
    updatedAt;
    static BASE_FEE_IN_CENTS = 300000;
    static DELIVERY_FEE_IN_CENTS = 150000;
    constructor(props) {
        this.id = props.id;
        this.reference = props.reference;
        this.productId = props.productId;
        this.customerId = props.customerId;
        this.amountInCents = props.amountInCents;
        this.baseFeeInCents = props.baseFeeInCents;
        this.deliveryFeeInCents = props.deliveryFeeInCents;
        this.totalInCents = props.totalInCents;
        this._status = props.status;
        this._wompiTransactionId = props.wompiTransactionId;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    get status() { return this._status; }
    get wompiTransactionId() { return this._wompiTransactionId; }
    isPending() { return this._status === TransactionStatus.PENDING; }
    approve(wompiId) {
        return new Transaction({ ...this.toProps(), status: TransactionStatus.APPROVED, wompiTransactionId: wompiId, updatedAt: new Date() });
    }
    decline(wompiId) {
        return new Transaction({ ...this.toProps(), status: TransactionStatus.DECLINED, wompiTransactionId: wompiId, updatedAt: new Date() });
    }
    markAsError() {
        return new Transaction({ ...this.toProps(), status: TransactionStatus.ERROR, updatedAt: new Date() });
    }
    toProps() {
        return { id: this.id, reference: this.reference, productId: this.productId,
            customerId: this.customerId, amountInCents: this.amountInCents,
            baseFeeInCents: this.baseFeeInCents, deliveryFeeInCents: this.deliveryFeeInCents,
            totalInCents: this.totalInCents, status: this._status,
            wompiTransactionId: this._wompiTransactionId, createdAt: this.createdAt, updatedAt: this.updatedAt };
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.entity.js.map