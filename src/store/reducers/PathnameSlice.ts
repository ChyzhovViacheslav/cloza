import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface IPathname {
    path: string
}

const initialState: IPathname = {
    path: '/'
}

export const pathNameSlice = createSlice({
    name: 'pathname',
    initialState,
    reducers: {
        changePath(state, action: PayloadAction<string>) {
            state.path = action.payload 
        }
    }
})

export default pathNameSlice.reducer