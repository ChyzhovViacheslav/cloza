import React, { useState, useEffect } from 'react'
import IconSelector from '../../assets/icons/icons'
import { useAppDispatch } from '../../hooks/redux'
import { postApi } from '../../services/PostService'
import { filterSlice } from '../../store/reducers/ProductFilter'
import s from '../../styles/styleComponents/Filter.module.scss'
import CollapsableItem from '../interface/collapsable/CollapsableItem'

export default function Filter() {
    const { filterSubCategories } = filterSlice.actions
    const { data, isLoading, isFetching } = postApi.useFetchAllCategoriesQuery(null)
    const dispatch = useAppDispatch()

    const [allCategories, setAllCategories] = useState<Object[]>()
    const [categoriesLimit, setCategoriesLimit] = useState([0, 5])

    useEffect(() => {
        if (!isFetching) {
            setAllCategories([...data.top, ...data.bottom, ...data.accesories, ...data.shoes].slice(categoriesLimit[0], categoriesLimit[1]))
        }
    }, [isFetching, categoriesLimit])

    const renderCategories = () => {
        if (!isLoading) {
            return (
                allCategories?.map((el: any) => {
                    return (
                        <div
                            className={s.filter__categories}
                            key={el}
                            onClick={() => { dispatch(filterSubCategories(el)) }}>
                            <h2>{el}</h2>
                        </div>
                    )
                })
            )
        } else return <IconSelector id='loader' />
    }

    return (
        <div className={s.filter}>
            <div className={s.filter__body}>
                <CollapsableItem isClosed={false} title='Цена' className={s.filter__price} tittleClassName={s.filter__title}>
                    <div className={s.filter__price_line}></div>
                    <div className={s.filter__price_value}><span>1 300₴</span> - <span>2 405₴</span></div>
                </CollapsableItem>
                <CollapsableItem isClosed={false} title='Категории' className={s.filter__categories} tittleClassName={s.filter__title}>
                    <div className={s.filter__categories_list}>
                        {renderCategories()}
                        <span
                            className={s.filter__categories_btn}
                            onClick={() => { 
                                setCategoriesLimit([0, categoriesLimit[1] + 10])
                            }}>Показать ещё</span>
                    </div>
                </CollapsableItem>
                <CollapsableItem isClosed={false} title='Бренды' className={s.filter__brands} tittleClassName={s.filter__title}>
                    <div className={s.filter__brand_current}>
                        <span>Burberry x</span>
                    </div>
                    <br />
                    <div className={s.filter__brand_list}>
                        <span>Бренды</span>
                        <div className={s.filter__brand_item}>
                            <span>Burberry</span>
                            <span>Burberry</span>
                            <span>Burberry</span>
                            <span>Burberry</span>
                            <span>Burberry</span>
                            <span>Burberry</span>
                            <span>Burberry</span>
                            <span>Burberry</span>
                            <span>Burberry</span>
                        </div>
                    </div>
                </CollapsableItem>
                <CollapsableItem isClosed={false} title='Состояние' className={s.filter__condition} tittleClassName={s.filter__title}>

                </CollapsableItem>
                <CollapsableItem isClosed={false} title='Размер одежды' className={s.filter__size_clothing} tittleClassName={s.filter__title}>

                </CollapsableItem>
                <CollapsableItem isClosed={false} title='Размер обуви' className={s.filter__size_shoes} tittleClassName={s.filter__title}>

                </CollapsableItem>
                <CollapsableItem isClosed={false} title='Цвета' className={s.filter__colors} tittleClassName={s.filter__title}>

                </CollapsableItem>
            </div>
        </div>
    )
}