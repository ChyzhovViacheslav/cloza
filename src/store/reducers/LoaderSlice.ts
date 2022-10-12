import { createSlice } from "@reduxjs/toolkit"

interface ILoaderState {
    isLoading: boolean
}

const initialState: ILoaderState = {
    isLoading: false
}

export const loaderSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
        openLoader(state) {
            state.isLoading = true
        },
        closeLoader(state){
            state.isLoading = false
        }
    }
})

export default loaderSlice.reducer