import React from 'react'
import s from './CategoriesItem.module.scss'
import placeholder from '../../assets/images/hdplaceholder.jpg'
import IconSelector from '../../assets/icons/icons'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { filterSlice } from '../../store/reducers/ProductFilter'

interface ICategoriesItem {
    name: string,
    currentCategory: string
}

export default function CategoriesItem({ currentCategory, name }: ICategoriesItem) {
    const { setSubCategories } = filterSlice.actions

    const navigate = useNavigate()
    const dispatch = useDispatch()

    return (
        <div
            className={s.categories}
            onClick={() => {
                dispatch(setSubCategories([name]))
                navigate(`/${currentCategory}?subcategory=${name}`)
            }}>
            <div className={s.categories__body}>
                <div className={s.categories__img}>
                    <img alt='placeholderJpg' src={placeholder} />
                </div>
                <div
                    className={s.categories__links}>
                    <h4>{name}</h4>
                    <IconSelector className={s.categories__ico} id='east' />
                </div>
            </div>
        </div>
    )
}