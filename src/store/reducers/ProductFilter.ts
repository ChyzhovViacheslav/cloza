import { createSlice } from "@reduxjs/toolkit"

interface IFilter {
    products: any,
    currentCategory: string,
    newProducts: any,
    minPrice: number,
    maxPrice: number,
    brands: any,
    newBrands: any,
    currentBrands: string
    conditions: any,
    newConditions: any,
    clothSize: any,
    newClothSize: any,
    colors: any,
    newColors: any
}

const initialState: IFilter = {
    products: null,
    currentCategory: null,
    newProducts: null,
    minPrice: 0,
    maxPrice: 200000,
    brands: null,
    newBrands: null,
    currentBrands: null,
    conditions: null,
    newConditions: null,
    clothSize: null,
    newClothSize: null,
    colors: null,
    newColors: null
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
            state.newProducts = state.products.filter(
                (el: any) => el.subCategory === action.payload
            )
            state.currentCategory = action.payload
        },
        setMinPrice(state, action) {
            state.minPrice = action.payload
        },
        setMaxPrice(state, action) {
            state.maxPrice = action.payload
        },
        setBrands(state, action) {
            state.brands = action.payload
            state.newBrands = state.brands
        },
        filterBrands(state, action) {
            state.newBrands = state.brands.filter(
                (el: any) => action.payload.includes(el)
            )
        },
        setCondition(state, action){
            state.conditions = action.payload
            state.newConditions = state.conditions
        },
        filterCondition(state, action){
            state.newConditions = action.payload
        },
        setClothSise(state, action){
            state.clothSize = action.payload
            state.newClothSize = state.clothSize
        },
        filterClothSize(state, action){
            state.newClothSize = action.payload
        },
        setColor(state, action){
            state.colors = action.payload
            state.newColors = state.colors
        },
        filterColor(state, action){
            state.newColors = action.payload
        },
        resetAllFilters(state){
            state.newBrands = state.brands
            state.newColors = state.colors
            state.newClothSize = state.clothSize
            state.newConditions = state.conditions
        }
    }
})

export default filterSlice.reducer