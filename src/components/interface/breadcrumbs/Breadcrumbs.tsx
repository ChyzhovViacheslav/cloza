import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import s from './Breadcrumbs.module.scss'

export default function Breadcrumbs() {
    const pathname = useLocation()
    const pathnames = pathname.pathname.split('/').filter(el => el)

    useEffect(() => {
    }, [pathnames.length])

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
                style={(pathnames.length - 1) === index ? { pointerEvents: 'none' } : { pointerEvents: 'all' }}
                key={index}
                to={`${el}`}>
                <span
                    className={s.breadcrumbs__link}
                    style={(pathnames.length - 1) === index ? { color: 'var(--text-paragraph)' } : { color: 'var(--text-title)' }}> {renamed()} </span>
            </Link>
        )
    })

    return (
        <div className={s.breadcrumbs} style={pathname.pathname !== '/terms' && pathname.pathname !== '/faq' && pathname.pathname !== '/' ? { display: 'block' } : { display: 'none' }}>
            <div className={s.breadcrumbs + ' _container'}>
                <div className={s.breadcrumbs__body}>
                    <h5>Мужское</h5>
                    <div className={s.breadcrumbs__links}>
                        <Link to='/'><span>Главная </span></Link>
                        {links}
                    </div>
                </div>
            </div>
        </div>
    )
}