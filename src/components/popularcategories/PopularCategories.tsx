import React from 'react'
import { Link } from 'react-router-dom'
import IconSelector from '../../assets/icons/icons'
import { extraApi } from '../../services/ExtraService'
import s from './PopularCategories.module.scss'
import CategoriesItem from '../categoriesitem/CategoriesItem'
import ErrorConnection from '../interface/errorconnection/ErrorConnection'

export default function PopularCategories() {
    const { data: categories, isLoading: categoriesIsLoading, isError } = extraApi.useGetCategoriesQuery(null)

    const renderCategories = () => {
        if (isError) {
            return <ErrorConnection />
        } else {
            return (
                categories[0].top.slice(0, 4).map((el: string, i: number) => {
                    return <CategoriesItem currentCategory='male' name={el} key={i} />
                })
            )
        }
    }

    return (
        <div className={s.popcategories}>
            <div className={s.popcategories__body}>
                <div className={s.popcategories__title}>
                    <h1>Популярные категории</h1>
                    <Link to='/categories'><span>Все категории</span></Link>
                </div>
                <div className={s.popcategories__content}>
                    {categoriesIsLoading ?
                        <IconSelector className={s.popcategories__loader} id='loader' />
                        :
                        renderCategories()}
                </div>
            </div>
        </div>
    )
}