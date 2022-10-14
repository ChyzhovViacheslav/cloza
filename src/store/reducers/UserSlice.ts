import { createSlice } from "@reduxjs/toolkit"

interface IPathname {
    email: string,
    id: string,
    userName: string
}

const initialState: IPathname = {
    email: null,
    id: null,
    userName: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action){
            state.email = action.payload.email
            state.id = action.payload.id
            state.userName = action.payload.userName           
        },
        removeUser(state){
            state.email = null
            state.id = null
            state.userName = null
        }
    }
})

export default userSlice.reducer