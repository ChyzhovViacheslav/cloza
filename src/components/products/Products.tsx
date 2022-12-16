import React from 'react'
import IconSelector from '../../assets/icons/icons'
import sortedProducts from '../productarea/SortedProduct'
import s from './Products.module.scss'
import { productApi } from '../../services/ProductService'

type IProducts = {
    limit: number,
    sortByPrice?: number,
    currentMainCategory?: string,
    salerEmail?: string
}

export default function Products({currentMainCategory, sortByPrice, limit, salerEmail }: IProducts) {
    const { data: products, isLoading, isFetching } = productApi.useGetAllProductsQuery(
        {
            page: 1,
            limit: limit,
            maincategory: currentMainCategory,
            sortByPrice: sortByPrice,
            email: salerEmail,
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
                    <span>Нет подходящих товаров</span>
                </div>
            )
        } else {
            return renderProducts
        }
    }

    return checkProducts()
}