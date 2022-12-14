export default interface IOrder {
    name: string,
    phone: number,
    address: string,
    city: string,
    index: number | string,
    products: any,
    orderTime: string,
    email: string,
    paymentType: string,
    deliveryType: string,
    costOfDelivery: number,
    costOfAllProducts: number,
    comment: string,
    delivered: boolean,
    paid: boolean
}