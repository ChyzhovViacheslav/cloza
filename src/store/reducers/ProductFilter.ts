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
    conditions: ["novaya_s_birkoy",
        "novaya_bez_birki",
        "nebolshie_defekti",
        "nadevalas_odin_raz",
        "nadevalas_neskolko_raz"],
    newConditions: [],
    clothSize: ['XXL', 'XL', 'L', 'M', 'S', 'XS', 'XXS'],
    newClothSize: [],
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
        setCondition(state, action) {
            state.newConditions = action.payload
        },
        setClothSize(state, action) {
            state.newClothSize = action.payload
        },
        setColor(state, action) {
            state.colors = action.payload
            state.newColors = state.colors
        }
    }
})

export default filterSlice.reducer