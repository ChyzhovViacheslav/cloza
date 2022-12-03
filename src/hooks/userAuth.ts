import { useAppSelector } from "./redux";

export default function useAuth(){
    const {email, username, image, _id, wishlist, cartlist} = useAppSelector(state => state.userReducer)
    return {
        isAuth: !!email,
        email,
        username,
        image,
        _id,
        wishlist,
        cartlist
    }
}