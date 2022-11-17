import { createSlice } from "@reduxjs/toolkit"

interface IFilter {
    currentCategory: [],
    mainCategories: any
    newProducts: any,
    price: any,
    brands: any,
    newBrands: any,
    conditions: any,
    newConditions: any,
    clothSize: any,
    newClothSize: any,
    colors: any,
    newColors: any
}

const initialState: IFilter = {
    currentCategory: [],
    mainCategories: ['female', 'male', 'unisex'],
    newProducts: null,
    price: [],
    brands: null,
    newBrands: [],
    conditions: [
        "novaya_s_birkoy",
        "novaya_bez_birki",
        "nebolshie_defekti",
        "nadevalas_odin_raz",
        "nadevalas_neskolko_raz"
    ],
    newConditions: [],
    clothSize: ['XXL', 'XL', 'L', 'M', 'S', 'XS', 'XXS'],
    newClothSize: [],
    colors: [
        'blue',
        'green',
        'orange',
        'red',
        'lightblue',
        'black',
        'violet',
        'gray',
        'white',
        'brown'
    ],
    newColors: []
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setSubCategories(state, action) {
            state.currentCategory = action.payload
        },
        setPrice(state, action) {
            state.price = action.payload
        },
        setInitialBrands(state, action) {
            state.brands = action.payload
        },
        setBrands(state, action) {
            state.newBrands = action.payload
        },
        setCondition(state, action) {
            state.newConditions = action.payload
        },
        setClothSize(state, action) {
            state.newClothSize = action.payload
        },
        setColor(state, action) {
            state.newColors = action.payload
        },
        resetAllFilters(state) {
            state.price = []
            state.newBrands = []
            state.newConditions = []
            state.newClothSize = []
            state.newColors = []
            state.currentCategory = []
        }
    }
})

export default filterSlice.reducer