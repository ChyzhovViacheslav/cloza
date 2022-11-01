import React from 'react'
import ProductArea from '../../components/productarea/ProductArea'
import { useAppSelector } from '../../hooks/redux'

export default function Female() {
    const { newProducts } = useAppSelector(state => state.filterReducer)

    const maleProduct = newProducts?.filter((el: any) => {
        return el.mainCategory === "Женское"
    })

    return (
        <ProductArea data={maleProduct}/>
    )
}