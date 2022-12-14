import ICartList from "../models/ICartList";
import { authUser } from "../services/AuthUser";
import { userSlice } from "../store/reducers/UserSlice";
import { useAppDispatch } from "./redux";
import useAuth from "./userAuth";

export default function useCartlist() {
    const { changeCartlist } = userSlice.actions
    const [changeUserInfo] = authUser.useChangeUserInfoMutation()
    const { cartlist } = useAuth()
    const dispatch = useAppDispatch()

    const addToCartlist = async (userId: string, productId: string, amount: number) => {
        const newCartList = [...cartlist, { id: productId, amount: amount }]
    
        dispatch(changeCartlist(newCartList))
        await changeUserInfo({
            id: userId,
            body: {
                cartlist: newCartList
            }
        })
    }

    const removeFromCartlist = async (userId:string, productId:string) => {
        const newCartList = cartlist.filter((el:ICartList) => el.id !== productId)

        dispatch(changeCartlist(newCartList))
        await changeUserInfo({
            id: userId,
            body: {
                cartlist: newCartList
            }
        })
    }

    const clearCartlist = async (userId:string) => {
        dispatch(changeCartlist([]))
        await changeUserInfo({
            id: userId,
            body: {
                cartlist: []
            }
        })
    }

    return {
        addToCartlist,
        removeFromCartlist,
        clearCartlist
    }
}