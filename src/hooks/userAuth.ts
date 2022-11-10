import { useAppSelector } from "./redux";

export default function useAuth(){
    const {email, username} = useAppSelector(state => state.userReducer)
    return {
        isAuth: !!email,
        email,
        username
    }
}