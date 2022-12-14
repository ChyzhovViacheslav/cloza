import { createSlice } from "@reduxjs/toolkit"

interface IPathname {
    username: string,
    email: string,
    image: string,
    _id: any,
    wishlist: [],
    cartlist: [],
    delivery_info: [],
    registerDate: string
}

const initialState: IPathname = {
    username: null,
    email: null,
    image: null,
    _id: null,
    wishlist: null,
    cartlist: null,
    delivery_info: null,
    registerDate: null
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
            state.delivery_info = action.payload.delivery_info
            state.registerDate = action.payload.registerDate
        },
        removeUser(state){
            state.email = null
            state.username = null
            state.image = null
            state._id = null
            state.wishlist = null
            state.cartlist = null
            state.delivery_info = null
            state.registerDate = null
        },
        changeWishlist(state, action){
            state.wishlist = action.payload
        },
        changeCartlist(state, action){
            state.cartlist = action.payload
        },
        changeDeliveryInfoList(state, action){
            state.delivery_info = action.payload
        },
        changeUserPhoto(state, action){
            state.image = action.payload
        },
        changeUserName(state, action){
            state.username = action.payload
        }
    }
})

export default userSlice.reducer