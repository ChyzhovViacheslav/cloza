import { createSlice } from "@reduxjs/toolkit"

interface IFavModalState {
    active: boolean
    typeSm: string
}

const initialState: IFavModalState = {
    active: false,
    typeSm: ''
}

export const smModalSlice = createSlice({
    name: 'favmodal',
    initialState,
    reducers: {
        openSmModal(state) {
            state.active = true
        },
        closeSmModal(state){
            state.active = false
        },
        changeToFav(state){
            state.typeSm = 'fav'
        },
        changeToProfile(state){
            state.typeSm = 'profile'
        },
        changeToSell(state){
            state.typeSm = 'sell'
        }
    }
})

export default smModalSlice.reducer