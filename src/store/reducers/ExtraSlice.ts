import { createSlice } from "@reduxjs/toolkit"

interface IExtraSliceState {
    currentProfileTab: string
}

const initialState: IExtraSliceState = {
    currentProfileTab: 'Ваши товары'
}

export const extraSlice = createSlice({
    name: 'extraSlice',
    initialState,
    reducers: {
        changeProfileTab(state, action){
            state.currentProfileTab = action.payload
        }
    }
})

export default extraSlice.reducer