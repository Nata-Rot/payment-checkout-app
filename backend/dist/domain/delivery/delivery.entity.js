"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delivery = exports.DeliveryStatus = void 0;
var DeliveryStatus;
(function (DeliveryStatus) {
    DeliveryStatus["PENDING"] = "PENDING";
    DeliveryStatus["ASSIGNED"] = "ASSIGNED";
    DeliveryStatus["SHIPPED"] = "SHIPPED";
    DeliveryStatus["DELIVERED"] = "DELIVERED";
})(DeliveryStatus || (exports.DeliveryStatus = DeliveryStatus = {}));
class Delivery {
    id;
    transactionId;
    customerId;
    productId;
    address;
    city;
    department;
    postalCode;
    _status;
    createdAt;
    updatedAt;
    constructor(props) {
        this.id = props.id;
        this.transactionId = props.transactionId;
        this.customerId = props.customerId;
        this.productId = props.productId;
        this.address = props.address;
        this.city = props.city;
        this.department = props.department;
        this.postalCode = props.postalCode;
        this._status = props.status;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    get status() { return this._status; }
    assign() {
        return new Delivery({ ...this.toProps(), status: DeliveryStatus.ASSIGNED, updatedAt: new Date() });
    }
    toProps() {
        return { id: this.id, transactionId: this.transactionId, customerId: this.customerId,
            productId: this.productId, address: this.address, city: this.city,
            department: this.department, postalCode: this.postalCode,
            status: this._status, createdAt: this.createdAt, updatedAt: this.updatedAt };
    }
}
exports.Delivery = Delivery;
//# sourceMappingURL=delivery.entity.js.map