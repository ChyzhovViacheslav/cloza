import React from 'react'
import IconSelector from '../../assets/icons/icons'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import sortedProducts from '../productarea/SortedProduct'
import s from '../../styles/styleComponents/Products.module.scss'
import { productApi } from '../../services/ProductService'

type IProducts = {
    limit: number,
    sortByPrice: any,
    currentMainCategory: string
}

export default function Products({currentMainCategory, sortByPrice, limit }: IProducts) {
    const { data: products, isLoading, isFetching } = productApi.useGetAllProductsQuery(
        {
            page: 1,
            limit: limit,
            maincategory: currentMainCategory,
            sortByPrice: sortByPrice
        }
    )

    const renderProducts = sortedProducts(products?.products)

    const checkProducts = () => {
        if (isLoading || isFetching) {
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

    return checkProducts()
}