import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import Filter from '../filter/Filter'
import s from '../../styles/styleComponents/ProductArea.module.scss'
import IconSelector from '../../assets/icons/icons'
import Modal from '../interface/modal/Modal'
import { filterModalSlice } from '../../store/reducers/FilterModalSlice'
import { postApi } from '../../services/PostService'
import { filterSlice } from '../../store/reducers/ProductFilter'
import Pagination from '../pagination/Pagination'
import MySelect from '../interface/inputs/MySelect'
import sortedProducts from './SortedProduct'
import { productApi } from '../../services/ProductService'
import { extraApi } from '../../services/ExtraService'
import { useLocation, useNavigate } from 'react-router'

interface IProductArea {
    data: any
}

export default function ProductArea({ data }: IProductArea) {
    const { closeModal } = filterModalSlice.actions
    const { active } = useAppSelector(state => state.FilterModalReducer)
    const { data: categories, isLoading: categoriesLoading } = extraApi.useGetCategoriesQuery(null)
    const { data: allBrands, isSuccess: succesBrands } = extraApi.useGetAllBrandsQuery(null)
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

    const { data: products, isLoading, isSuccess: succesProduct } = productApi.useGetAllProductsQuery({ page: 1, limit: 15, params: fancyUrl() })
    const [currentSort, setSort] = useState("Рекомендации")

    const {
    } = useAppSelector(state => state.filterReducer)

    // console.log(newClothSize);

    // const {
    //     setData,
    //     setBrands,
    //     setCondition,
    //     setClothSise,
    //     setColor,
    //     filterSubCategories
    // } = filterSlice.actions


    // const conditions =
    //     [
    //         'Новая с биркой',
    //         'Новая без бирки',
    //         'Небольшие дефекты',
    //         'Надевалась один раз',
    //         'Надевалась несколько раз'
    //     ]

    const sizeType = ['XXL', 'XL', 'L', 'M', 'S', 'XS', 'XXS']

    // const colors = ['Синий', 'Зелёный', 'Оранжевый', 'Красный', 'Голубой', 'Чёрный', 'Фиолетовый', 'Серый', 'Белый', 'Коричневый']

    // useEffect(() => {
    //     if (!currentCategory) {
    //         dispatch(setData(products))
    //     }
    //     if (!newBrands) {
    //         dispatch(setBrands(allBrands))
    //     }
    //     if (!newConditions) {
    //         dispatch(setCondition(conditions))
    //     }
    //     if (!newClothSize) {
    //         dispatch(setClothSise(sizeType))
    //     }
    //     if (!newColors) {
    //         dispatch(setColor(colors))
    //     }
    // }, [succesProduct, currentCategory, succesBrands, newBrands, newConditions, newClothSize, newColors])

    // useEffect(() => {

    // }, [currentElement])


    // const filtredPriceProduct = data?.filter(
    //     (el: any) => el.price <= maxPrice && el.price >= minPrice
    // )

    // const filtredBrands = filtredPriceProduct?.filter((el: any) => {
    //     if (newBrands?.includes(el.brand)) {
    //         return el
    //     }
    // })

    // const filtredConditions = filtredBrands?.filter((el: any) => {
    //     if (newConditions?.includes(el.condition)) {
    //         return el
    //     }
    // })

    // const filtredClothSize = filtredConditions?.filter((el: any) => {
    //     if (newClothSize?.includes(el.size)) {
    //         return el
    //     }
    // })

    // const filterColor = filtredClothSize?.filter((el: any, i: any) => {
    //     if (newColors?.includes(el.color)) {
    //         return el
    //     }
    // })

    const sortedProduct = sortedProducts(products)

    // const renderCategories = (category: any) => {
    //     return (
    //         category?.map((el: string, i: number) => {
    //             return <p onClick={() => {
    //                 dispatch(filterSubCategories(el))
    //                 dispatch(closeModal())
    //             }} key={i}>{el}</p>
    //         })
    //     )
    // }

    // const checkProducts = () => {
    //     if (isLoading) {
    //         return <div className={s.productarea__product_loader}><IconSelector id='loader' /></div>
    //     } else if (!sortedProduct?.length) {
    //         return (
    //             <div className={s.productarea__empty}>
    //                 <IconSelector id='search' />
    //                 <span>Нед подходящих товаров</span>
    //             </div>
    //         )
    //     } else {
    //         return sortedProduct?.slice(currentElement[0] - 1, currentElement[1])
    //     }
    // }

    return (
        <div className={s.productarea}>
            <div className={s.productarea__body}>
                <div className={s.productarea__content}>
                    <div className={s.productarea__sort}>
                        <div className={s.productarea__show}>
                            {/* <span>Показано {currentElement[0]} - {currentElement[1]} из {sortedProduct?.length}</span> */}
                        </div>
                        <div className={s.productarea__sort_action}>
                            <span>Сортировать:</span>
                            <MySelect
                                data={["Новые предложения", "Цена по возрастанию", "Цена по убыванию"]}
                                onChange={(e) => console.log('sort')}
                                defaultValue={"Рекомендации"} />
                        </div>
                    </div>
                    {/* {checkProducts()} */}
                    {sortedProduct}
                    {/* {sortedProduct?.length ? <Pagination setCurrentElement={setCurrentElement} data={sortedProduct} /> : null} */}
                </div>
                <Filter fancyUrl={fancyUrl} />
            </div>
            <Modal active={active} closeModal={closeModal}>
                {categoriesLoading ? <IconSelector className={s.pa_modal__loader} id='loader' /> : <div className={s.pa_modal}>
                    <div className={`${s.pa_modal__top} ${s.pa_modal__column}`}>
                        <h2>Верх</h2>
                        {/* {renderCategories(categories[0]?.top)} */}
                    </div>
                    <div className={`${s.pa_modal__bottom} ${s.pa_modal__column}`}>
                        <h2>Низ</h2>
                        {/* {renderCategories(categories[0]?.bottom)} */}
                    </div>
                    <div className={`${s.pa_modal__shoes} ${s.pa_modal__column}`}>
                        <h2>Обувь</h2>
                        {/* {renderCategories(categories[0]?.shoes)} */}
                    </div>
                    <div className={`${s.pa_modal__accessories} ${s.pa_modal__column}`}>
                        <h2>Аксессуары</h2>
                        {/* {renderCategories(categories[0]?.accessories)} */}
                    </div>
                </div>}
            </Modal>
        </div>
    )
}