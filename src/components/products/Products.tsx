import React, { useEffect, useState } from 'react'
import IconSelector from '../../assets/icons/icons'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { postApi } from '../../services/PostService'
import { filterSlice } from '../../store/reducers/ProductFilter'
import sortedProducts from '../productarea/SortedProduct'
import s from '../../styles/styleComponents/Products.module.scss'
import { productApi } from '../../services/ProductService'

type IProducts = {
    numberOfElements: number
    currentSort: string
    currentCategory: string
}

export default function Products({ currentSort, currentCategory }: IProducts) {
    const {data: products, isLoading} = productApi.useGetAllProductsQuery(1)
    const { setData } = filterSlice.actions
    const { newProducts } = useAppSelector(state => state.filterReducer)
    
    const renderProducts = sortedProducts(newProducts)?.filter((el:any) => el.props.mainCategory === currentCategory)

    const dispatch = useAppDispatch()

    const checkProducts = () => {
        if (isLoading) {
            return <div className={s.product__product_loader}><IconSelector id='loader' /></div>
        } else if (!renderProducts?.length) {
            return (
                <div className={s.product__empty}>
                    <IconSelector id='search' />
                    <span>Нед подходящих товаров</span>
                </div>
            )
        } else {
            return renderProducts
        }
    }

    useEffect(() => {
        if (!newProducts?.length) {
            dispatch(setData(products))
        }
    }, [currentSort, isLoading])

    return checkProducts()
}