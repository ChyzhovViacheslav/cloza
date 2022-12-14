import React, { useState } from 'react'
import Filter from '../filter/Filter'
import s from '../../styles/styleComponents/ProductArea.module.scss'
import IconSelector from '../../assets/icons/icons'
import Pagination from '../pagination/Pagination'
import MySelect from '../interface/inputs/MySelect'
import { productApi } from '../../services/ProductService'
import { useLocation } from 'react-router'
import productCards from './SortedProduct'
import ShowTotalItems from '../interface/showTotalItems/ShowTotalItems'
import CategoriesModal from '../interface/categoriesmodal/CategoriesModal'

export default function ProductArea() {
    const [sortByPrice, setSortByPrice] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [modalIsActive, setModalIsActive] = useState(false)

    const location = useLocation()

    const fancyUrl = () => {
        if (location.search) {
            const splicedLocation = location.search.replace('?', '').split('/')
            const equalSpliced = splicedLocation.map((el: any) => el.split('='))
            const comaSpliced = equalSpliced.map((el: any) => [el[0], el[1].split(',')])
            const joinedArrs = comaSpliced.map((el: any) => `${el[0]}[]=${el[1].join(`&${el[0]}[]=`)}`)
            return joinedArrs.join('&')
        } else return ''
    }

    const { data: products, isFetching: productsIsFetching } = productApi.useGetAllProductsQuery(
        {
            page: currentPage,
            limit: 15,
            maincategory: location.pathname.substring(1) === 'sale' ? 'undefined': location.pathname.substring(1),
            discount: location.pathname.substring(1) === 'sale' ? 'any' : 'undefined',
            sortByPrice: sortByPrice,
            params: fancyUrl()
        }
    )

    const sortedProduct = productCards(products?.products)

    const productIsEmpty = sortedProduct?.length === 0 ? <div className={s.productarea__empty}>
        <IconSelector id='search' />
        <span>Нед подходящих товаров</span>
    </div> : null

    const checkedProduct = () => {
        if (!productsIsFetching) {
            if (sortedProduct?.length && products.totalPages !== 1) {
                return <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={products.totalPages} />
            } else return null
        }
    }
    return (
        <div className={s.productarea}>
            <div className={s.productarea__body}>
                <div className={s.productarea__content}>
                    <div className={s.productarea__sort}>
                        <div className={s.productarea__show}>
                            <ShowTotalItems
                                totalItems={products?.totalProducts}
                                currentItems={sortedProduct?.length}
                                currentPage={currentPage}
                                spreading={15} />
                        </div>
                        <div className={s.productarea__sort_action}>
                            <span>Сортировать:</span>
                            <MySelect
                                data={["Новые предложения", "Цена по возрастанию", "Цена по убыванию"]}
                                onChange={(e) => {
                                    switch (e.target.value) {
                                        case 'Цена по возрастанию': setSortByPrice(1)
                                            break;
                                        case 'Цена по убыванию': setSortByPrice(-1)
                                            break;
                                        default: setSortByPrice(0);
                                    }
                                }}
                                defaultValue={"Рекомендации"} />
                        </div>
                    </div>
                    {sortedProduct && !productsIsFetching ? sortedProduct : <IconSelector className={s.productarea__product_loader} id='loader' />}
                    {productIsEmpty}
                    {checkedProduct()}
                </div>
                <Filter setModalIsActive={setModalIsActive} />
            </div>
            <CategoriesModal modalIsActive={modalIsActive} setModalIsActive={setModalIsActive}/>
        </div>
    )
}