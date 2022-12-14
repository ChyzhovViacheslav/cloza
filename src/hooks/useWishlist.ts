import { authUser } from '../services/AuthUser'
import { userSlice } from '../store/reducers/UserSlice'
import { useAppDispatch } from './redux'
import useAuth from './userAuth'

export default function useWishlist() {
    const { changeWishlist } = userSlice.actions
    const [changeUserInfo] = authUser.useChangeUserInfoMutation()
    const { wishlist } = useAuth()
    const dispatch = useAppDispatch()

    const addToWishlist = async (userId: string, productId: string) => {
        const newWishList = [...wishlist, productId]
    
        dispatch(changeWishlist(newWishList))
        await changeUserInfo({
            id: userId,
            body: {
                wishlist: newWishList
            }
        })
    }

    const removeFromWishlist = async (userId:string, productId:string) => {
        const newWishList = wishlist.filter((id:string) => id !== productId)

        dispatch(changeWishlist(newWishList))
        await changeUserInfo({
            id: userId,
            body: {
                wishlist: newWishList
            }
        })
    }

    const clearWishlist = async (userId:string) => {
        dispatch(changeWishlist([]))
        await changeUserInfo({
            id: userId,
            body: {
                wishlist: []
            }
        })
    }

    return {
        addToWishlist,
        removeFromWishlist,
        clearWishlist
    }
}