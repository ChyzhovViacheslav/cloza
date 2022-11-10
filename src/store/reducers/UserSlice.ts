import { createSlice } from "@reduxjs/toolkit"

interface IPathname {
    username: string,
    email: string,
}

const initialState: IPathname = {
    username: null,
    email: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action){
            state.email = action.payload.email
            state.username = action.payload.username           
        },
        removeUser(state){
            state.email = null
            state.username = null
        }
    }
})

export default userSlice.reducer