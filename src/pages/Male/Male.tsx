import { current } from '@reduxjs/toolkit'
import React from 'react'
import ProductArea from '../../components/productarea/ProductArea'
import { useAppSelector } from '../../hooks/redux'

export default function Male() {
    const { newProducts } = useAppSelector(state => state.filterReducer)
    
    const maleProduct = newProducts?.filter((el: any) => {
        return el.mainCategory === "Мужское"
    })

    return (
        <ProductArea data={maleProduct}/>
    )
}