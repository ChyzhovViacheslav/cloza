import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import Filter from '../filter/Filter'
import s from '../../styles/styleComponents/ProductArea.module.scss'
import IconSelector from '../../assets/icons/icons'
import Modal from '../interface/modal/Modal'
import { filterModalSlice } from '../../store/reducers/FilterModalSlice'
import { postApi } from '../../services/PostService'
import { filterSlice } from '../../store/reducers/ProductFilter'

interface IProductArea {
    title?: string,
    data: any,
    isLoading: boolean,
    children?: any
}

export default function ProductArea({ data, title, isLoading, children }: IProductArea) {
    const { closeModal } = filterModalSlice.actions
    const { filterSubCategories } = filterSlice.actions
    const { active } = useAppSelector(state => state.FilterModalReducer)
    const { data: categories, isLoading: categoriesLoading } = postApi.useFetchAllCategoriesQuery(null)
    const dispatch = useAppDispatch()
    
    const renderCategories = (category: any) => {
        return (
            category.map((el: string, i: number) => {
                return <p onClick={() => {
                    dispatch(filterSubCategories(el))
                    dispatch(closeModal())
                }} key={i}>{el}</p>
            })
        )
    }

    return (
        <div className={s.productarea}>
            <div className={s.productarea__body}>
                <div className={s.productarea__content}>
                    <div className={s.productarea__sort}>
                        <div className={s.productarea__show}>
                            <span>Показано 1 - 15 из 874</span>
                        </div>
                        <div className={s.productarea__sort_action}>
                            <span>Сортировать:</span>
                            {children}
                        </div>
                    </div>
                    {isLoading ? <IconSelector id='loader' /> : data()}
                </div>
                <Filter />
            </div>
            <Modal active={active} closeModal={closeModal}>
                {categoriesLoading ? <IconSelector className={s.pa_modal__loader} id='loader' /> : <div className={s.pa_modal}>
                    <div className={`${s.pa_modal__top} ${s.pa_modal__column}`}>
                        <h2>Верх</h2>
                        {renderCategories(categories?.top)}
                    </div>
                    <div className={`${s.pa_modal__bottom} ${s.pa_modal__column}`}>
                        <h2>Низ</h2>
                        {renderCategories(categories?.bottom)}
                    </div>
                    <div className={`${s.pa_modal__shoes} ${s.pa_modal__column}`}>
                        <h2>Обувь</h2>
                        {renderCategories(categories?.shoes)}
                    </div>
                    <div className={`${s.pa_modal__accessories} ${s.pa_modal__column}`}>
                        <h2>Аксессуары</h2>
                        {renderCategories(categories?.accesories)}
                    </div>
                </div>}
            </Modal>
        </div>
    )
}