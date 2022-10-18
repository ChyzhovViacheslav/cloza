import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { filterSlice } from '../../../store/reducers/ProductFilter'
import s from './Breadcrumbs.module.scss'

export default function Breadcrumbs() {
    const pathname = useLocation()
    const pathnames = pathname.pathname.split('/').filter(el => el)
    const { currentCategory } = useAppSelector(state => state.filterReducet)
    const { resetFilter } = filterSlice.actions
    const dispatch = useAppDispatch()
    useEffect(() => {

    }, [currentCategory])

    const links = pathnames.map((el, index) => {
        const renamed = () => {
            switch (el) {
                case 'male': return 'Мужское'
                case 'female': return 'Женское'
                case 'unisex': return 'Унисекс'
                default: return el
            }
        }
        return (
            <Link
                style={!currentCategory ? { pointerEvents: 'none' } : { pointerEvents: 'all' }}
                key={index}
                to={`${el}`}>
                <span
                    onClick={() => dispatch(resetFilter())}
                    className={s.breadcrumbs__link}
                    style={!currentCategory ? { color: 'var(--text-paragraph)' } : { color: 'var(--text-title)' }}>{renamed()}</span>
            </Link>
        )
    })

    return (
        <div
            className={s.breadcrumbs}
            style={pathnames[0] === 'male' || pathnames[0] === 'female' || pathnames[0] === 'unisex' ? { display: 'block' } : { display: 'none' }}>
            <div className={s.breadcrumbs__container + ' _container'}>
                <div className={s.breadcrumbs__body}>
                    <div className={s.breadcrumbs__links}>
                        <Link to='/'><span>Главная</span></Link>
                        {links}
                        {currentCategory && <span style={{ pointerEvents: 'none' }} className={s.breadcrumbs__link}>{currentCategory}</span>}
                    </div>
                </div>
            </div>
        </div>
    )
}