import { useAppSelector } from "./redux";

export default function useAuth(){
    const {email, token, id, name} = useAppSelector(state => state.userReducer)
    return {
        isAuth: !!email,
        email,
        token,
        id,
        name
    }
}