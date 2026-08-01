export interface IOrderItem {
    productName: string;
    quantity: number;
    price: number;
}

export interface IOrder {
    code: string;
    status: string;
    orderItems: IOrderItem[];
}
