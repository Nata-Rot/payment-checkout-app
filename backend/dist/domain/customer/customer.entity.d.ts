export interface CustomerProps {
    id: string;
    email: string;
    fullName: string;
    phone: string;
    createdAt: Date;
}
export declare class Customer {
    readonly id: string;
    readonly email: string;
    readonly fullName: string;
    readonly phone: string;
    readonly createdAt: Date;
    constructor(props: CustomerProps);
    toProps(): CustomerProps;
}
