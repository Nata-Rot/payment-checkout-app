export declare enum DeliveryStatus {
    PENDING = "PENDING",
    ASSIGNED = "ASSIGNED",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED"
}
export interface DeliveryProps {
    id: string;
    transactionId: string;
    customerId: string;
    productId: string;
    address: string;
    city: string;
    department: string;
    postalCode: string;
    status: DeliveryStatus;
    createdAt: Date;
    updatedAt: Date;
}
export declare class Delivery {
    readonly id: string;
    readonly transactionId: string;
    readonly customerId: string;
    readonly productId: string;
    readonly address: string;
    readonly city: string;
    readonly department: string;
    readonly postalCode: string;
    private _status;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(props: DeliveryProps);
    get status(): DeliveryStatus;
    assign(): Delivery;
    toProps(): DeliveryProps;
}
