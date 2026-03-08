"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
class Customer {
    id;
    email;
    fullName;
    phone;
    createdAt;
    constructor(props) {
        this.id = props.id;
        this.email = props.email;
        this.fullName = props.fullName;
        this.phone = props.phone;
        this.createdAt = props.createdAt;
    }
    toProps() {
        return { id: this.id, email: this.email, fullName: this.fullName, phone: this.phone, createdAt: this.createdAt };
    }
}
exports.Customer = Customer;
//# sourceMappingURL=customer.entity.js.map