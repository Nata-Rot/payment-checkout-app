export interface ProductProps {
    id: string;
    name: string;
    description: string;
    priceInCents: number;
    stock: number;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class Product {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly priceInCents: number;
    private _stock;
    readonly imageUrl: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    constructor(props: ProductProps);
    get stock(): number;
    hasStock(): boolean;
    decrementStock(): Product;
    toProps(): ProductProps;
}
