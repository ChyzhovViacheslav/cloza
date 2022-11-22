import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import Filter from '../filter/Filter'
import s from '../../styles/styleComponents/ProductArea.module.scss'
import IconSelector from '../../assets/icons/icons'
import Modal from '../interface/modal/Modal'
import { filterModalSlice } from '../../store/reducers/FilterModalSlice'
import { filterSlice } from '../../store/reducers/ProductFilter'
import Pagination from '../pagination/Pagination'
import MySelect from '../interface/inputs/MySelect'
import { productApi } from '../../services/ProductService'
import { extraApi } from '../../services/ExtraService'
import { useLocation } from 'react-router'
import productCards from './SortedProduct'
import ShowTotalItems from '../interface/showTotalItems/ShowTotalItems'

export default function ProductArea() {
    const { closeModal } = filterModalSlice.actions
    const { setSubCategories } = filterSlice.actions
    const { active } = useAppSelector(state => state.FilterModalReducer)
    const { data: categories, isLoading: categoriesLoading } = extraApi.useGetCategoriesQuery(null)
    const [sortByPrice, setSortByPrice] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const dispatch = useAppDispatch()
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
            maincategory: location.pathname.substring(1),
            sortByPrice: sortByPrice,
            params: fancyUrl()
        }
    )

    const sortedProduct = productCards(products?.products)

    const renderCategories = (category: []) => {
        return (
            category.map((el: string, i: number) => {
                return <p key={i} onClick={() => {
                    dispatch(setSubCategories([el]))
                    dispatch(closeModal())
                }}>{el}</p>
            })
        )
    }

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
                <Filter />
            </div>
            <Modal active={active} closeModal={closeModal}>
                {categoriesLoading ? <IconSelector className={s.pa_modal__loader} id='loader' /> : <div className={s.pa_modal}>
                    <div className={`${s.pa_modal__top} ${s.pa_modal__column}`}>
                        <h2>Верх</h2>
                        {renderCategories(categories[0]?.top)}
                    </div>
                    <div className={`${s.pa_modal__bottom} ${s.pa_modal__column}`}>
                        <h2>Низ</h2>
                        {renderCategories(categories[0]?.bottom)}
                    </div>
                    <div className={`${s.pa_modal__shoes} ${s.pa_modal__column}`}>
                        <h2>Обувь</h2>
                        {renderCategories(categories[0]?.shoes)}
                    </div>
                    <div className={`${s.pa_modal__accessories} ${s.pa_modal__column}`}>
                        <h2>Аксессуары</h2>
                        {renderCategories(categories[0]?.accessories)}
                    </div>
                </div>}
            </Modal>
        </div>
    )
}