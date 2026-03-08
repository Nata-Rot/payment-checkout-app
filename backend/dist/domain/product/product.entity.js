"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    id;
    name;
    description;
    priceInCents;
    _stock;
    imageUrl;
    createdAt;
    updatedAt;
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
        this.priceInCents = props.priceInCents;
        this._stock = props.stock;
        this.imageUrl = props.imageUrl;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
    }
    get stock() { return this._stock; }
    hasStock() { return this._stock > 0; }
    decrementStock() {
        if (!this.hasStock())
            throw new Error('No stock available');
        return new Product({ ...this.toProps(), stock: this._stock - 1 });
    }
    toProps() {
        return { id: this.id, name: this.name, description: this.description,
            priceInCents: this.priceInCents, stock: this._stock, imageUrl: this.imageUrl,
            createdAt: this.createdAt, updatedAt: this.updatedAt };
    }
}
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map