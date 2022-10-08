import React from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import s from './Breadcrumbs.module.scss'

export default function Breadcrumbs() {
    const pathname = useLocation()
    const pathnames = pathname.pathname.split('/').filter(el => el)

    const links = pathnames.map((el, index) => {
        const renamed = () => {
            switch (el) {
                case 'male': return 'Мужской'
                case 'female': return 'Женский'
                case 'unisex': return 'Унисекс'
                default: return el
            }
        }
        return (
            <Link key={index} to={`${el}`}>
                <span className={s.breadcrumbs__link} style={(pathnames.length - 1) === index ? {color:'var(--text-paragraph)', pointerEvents: 'none'} : {color: 'auto'}}> {renamed()} </span>
            </Link>
        )
    })

    return (
        <div className={s.breadcrumbs} style={pathname.pathname !== '/terms' && pathname.pathname !== '/faq' && pathname.pathname !== '/' ? {display: 'block'}:{display: 'none'}}>
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