import { createSlice } from "@reduxjs/toolkit"

interface IFilter {
    products: any
    isLoading?: boolean
    newProducts: any
    currentCategory: string
}

const initialState: IFilter = {
    products: null,
    newProducts: null,
    isLoading: true,
    currentCategory: null
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setData(state, action){
            state.products = action.payload
            state.newProducts = state.products
            state.isLoading = false
        },
        resetFilter(state){
            state.newProducts = state.products
            state.currentCategory = null
        },
        filterSubCategories(state, action){
            state.newProducts = state.products.filter((el:any) => {
                return el.subCategory === action.payload
            })
            state.currentCategory = action.payload
        }
    }
})

export default filterSlice.reducer