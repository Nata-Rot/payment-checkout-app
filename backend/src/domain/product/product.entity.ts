export interface ProductProps {
  id: string; name: string; description: string;
  priceInCents: number; stock: number; imageUrl: string;
  createdAt: Date; updatedAt: Date;
}
export class Product {
  readonly id: string; readonly name: string; readonly description: string;
  readonly priceInCents: number; private _stock: number;
  readonly imageUrl: string; readonly createdAt: Date; readonly updatedAt: Date;
  constructor(props: ProductProps) {
    this.id = props.id; this.name = props.name; this.description = props.description;
    this.priceInCents = props.priceInCents; this._stock = props.stock;
    this.imageUrl = props.imageUrl; this.createdAt = props.createdAt; this.updatedAt = props.updatedAt;
  }
  get stock(): number { return this._stock; }
  hasStock(): boolean { return this._stock > 0; }
  decrementStock(): Product {
    if (!this.hasStock()) throw new Error('No stock available');
    return new Product({ ...this.toProps(), stock: this._stock - 1 });
  }
  toProps(): ProductProps {
    return { id: this.id, name: this.name, description: this.description,
      priceInCents: this.priceInCents, stock: this._stock, imageUrl: this.imageUrl,
      createdAt: this.createdAt, updatedAt: this.updatedAt };
  }
}
