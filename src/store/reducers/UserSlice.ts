import { createSlice } from "@reduxjs/toolkit"

interface IPathname {
    email: string,
    token: string,
    id: string,
    name: string
}

const initialState: IPathname = {
    email: null,
    token: null,
    id: null,
    name: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action){
            state.email = action.payload.email
            state.id = action.payload.id            
            state.token = action.payload.token
            state.name = action.payload.name           
        },
        removeUser(state){
            state.email = null
            state.id = null            
            state.token = null 
            state.name = null
        }
    }
})

export default userSlice.reducer