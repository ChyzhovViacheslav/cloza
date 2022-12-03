import { createSlice } from "@reduxjs/toolkit"

interface IPathname {
    username: string,
    email: string,
    image: any,
    _id: any,
    wishlist: [],
    cartlist: []
}

const initialState: IPathname = {
    username: null,
    email: null,
    image: null,
    _id: null,
    wishlist: null,
    cartlist: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action){
            state.email = action.payload.email
            state.username = action.payload.username
            state.image = action.payload.image   
            state._id = action.payload._id
            state.wishlist = action.payload.wishlist
            state.cartlist = action.payload.cartlist
        },
        removeUser(state){
            state.email = null
            state.username = null
            state.image = null
            state._id = null
            state.wishlist = null
            state.cartlist = null
        },
        changeWishlist(state, action){
            state.wishlist = action.payload
        },
        changeCartlist(state, action){
            state.cartlist = action.payload
        }
    }
})

export default userSlice.reducer