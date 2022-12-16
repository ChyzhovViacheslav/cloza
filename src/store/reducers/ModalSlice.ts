import { createSlice } from "@reduxjs/toolkit"

interface IModalState {
    active: boolean
    type: string
}

const initialState: IModalState = {
    active: false,
    type: 'login'
}

export const loginModalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal(state, action) {
            state.active = action.payload
        },
        changeModalTypeLogin(state){
            state.type = 'login'
        },
        changeModalTypeRegister(state){
            state.type = 'register'
        }
    }
})

export default loginModalSlice.reducer