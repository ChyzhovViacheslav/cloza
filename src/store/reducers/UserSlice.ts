import { createSlice } from "@reduxjs/toolkit"

interface IPathname {
    username: string,
    email: string,
    image: any
}

const initialState: IPathname = {
    username: null,
    email: null,
    image: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action){
            state.email = action.payload.email
            state.username = action.payload.username
            state.image = action.payload.image        
        },
        removeUser(state){
            state.email = null
            state.username = null
            state.image = null
        }
    }
})

export default userSlice.reducer