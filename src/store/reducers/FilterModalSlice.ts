import { createSlice } from "@reduxjs/toolkit"

interface IFilterModalState {
    active: boolean
}

const initialState: IFilterModalState = {
    active: false
}

export const filterModalSlice = createSlice({
    name: 'filterModal',
    initialState,
    reducers: {
        openModal(state) {
            state.active = true
        },
        closeModal(state){
            state.active = false
        }
    }
})

export default filterModalSlice.reducer