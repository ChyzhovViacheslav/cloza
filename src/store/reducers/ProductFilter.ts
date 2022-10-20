import { createSlice } from "@reduxjs/toolkit"

interface IFilter {
    products: any
    currentCategory: string
    newProducts: any
}

const initialState: IFilter = {
    products: null,
    currentCategory: null,
    newProducts: null
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setData(state, action) {
            state.products = action.payload
            state.newProducts = state.products
        },
        resetFilter(state) {
            state.currentCategory = null
        },
        filterSubCategories(state, action) {
            state.newProducts = state.products.filter((el: any) => {
                return el.subCategory === action.payload
            })
            state.currentCategory = action.payload
        }
    }
})

export default filterSlice.reducer