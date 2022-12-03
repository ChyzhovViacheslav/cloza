import React from 'react'
import { Link } from 'react-router-dom'
import IconSelector from '../../assets/icons/icons'
import { authUser } from '../../services/AuthUser'
import s from '../../styles/styleComponents/TopSalers.module.scss'
import SalerItem from '../salerItem/SalerItem'

export default function TopSalers() {
    const { data: users, isLoading: usersIsLoading } = authUser.useFetchAllUsersQuery({
        sortByRating: -1,
        page: 1,
        limit: 4
    })

    const renderUsers = () => {
        return (
            users?.users.map((el: any, i: number) => {
                return (
                    <SalerItem
                        _id={el._id}
                        username={el.username}
                        image={el.image}
                        key={i} />
                )
            })
        )
    }

    return (
        <section className={s.topsalers}>
            <div className={s.topsalers__body}>
                <div className={s.topsalers__titles}>
                    <div className={s.topsalers__title}>
                        <span>Продавцы, заслужившие доверие</span>
                        <h1>Популярные продавцы</h1>
                    </div>
                    <Link to='/salers'><span>Все продавцы</span></Link>
                </div>
                <div className={s.topsalers__content}>
                    {usersIsLoading ? <IconSelector className={s.topsalers__loader} id='loader'/> : renderUsers()}
                </div>
            </div>
        </section>
    )
}