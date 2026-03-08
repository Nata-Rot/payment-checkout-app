export enum DeliveryStatus {
  PENDING = 'PENDING', ASSIGNED = 'ASSIGNED', SHIPPED = 'SHIPPED', DELIVERED = 'DELIVERED',
}
export interface DeliveryProps {
  id: string; transactionId: string; customerId: string; productId: string;
  address: string; city: string; department: string; postalCode: string;
  status: DeliveryStatus; createdAt: Date; updatedAt: Date;
}
export class Delivery {
  readonly id: string; readonly transactionId: string; readonly customerId: string;
  readonly productId: string; readonly address: string; readonly city: string;
  readonly department: string; readonly postalCode: string;
  private _status: DeliveryStatus; readonly createdAt: Date; readonly updatedAt: Date;
  constructor(props: DeliveryProps) {
    this.id = props.id; this.transactionId = props.transactionId;
    this.customerId = props.customerId; this.productId = props.productId;
    this.address = props.address; this.city = props.city;
    this.department = props.department; this.postalCode = props.postalCode;
    this._status = props.status; this.createdAt = props.createdAt; this.updatedAt = props.updatedAt;
  }
  get status(): DeliveryStatus { return this._status; }
  assign(): Delivery {
    return new Delivery({ ...this.toProps(), status: DeliveryStatus.ASSIGNED, updatedAt: new Date() });
  }
  toProps(): DeliveryProps {
    return { id: this.id, transactionId: this.transactionId, customerId: this.customerId,
      productId: this.productId, address: this.address, city: this.city,
      department: this.department, postalCode: this.postalCode,
      status: this._status, createdAt: this.createdAt, updatedAt: this.updatedAt };
  }
}
