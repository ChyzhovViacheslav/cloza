import ICartList from "./ICartList"
import IDeliveryInfo from "./IDeliveryInfo"

export default interface IUseAuth {
    isAuth: boolean,
    email: string,
    username: string,
    image: string,
    _id: string,
    wishlist: string[]
    cartlist: ICartList[]
    delivery_info: IDeliveryInfo[]
    registerDate: string
}