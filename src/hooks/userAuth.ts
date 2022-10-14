import { useAppSelector } from "./redux";

export default function useAuth(){
    const {email, id, userName} = useAppSelector(state => state.userReducer)
    return {
        isAuth: !!email,
        email,
        id,
        userName
    }
}