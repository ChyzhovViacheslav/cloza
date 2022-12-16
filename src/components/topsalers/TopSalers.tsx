import React from 'react'
import { Link } from 'react-router-dom'
import IconSelector from '../../assets/icons/icons'
import { authUser } from '../../services/AuthUser'
import s from './TopSalers.module.scss'
import ErrorConnection from '../interface/errorconnection/ErrorConnection'
import SalerItem from '../salerItem/SalerItem'
import IUser from '../../models/IUser'

export default function TopSalers() {
    const { data: users, isLoading: usersIsLoading, isError } = authUser.useFetchAllUsersQuery({
        page: 1,
        limit: 4
    })

    const renderUsers = () => {
        if (isError) {
            return <ErrorConnection />
        } else {
            return (
                users?.users.map((el: IUser) => {
                    return (
                        <SalerItem
                            _id={el._id}
                            username={el.username}
                            image={el.image}
                            key={el._id} />
                    )
                })
            )
        }
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
                    {usersIsLoading ? <IconSelector className={s.topsalers__loader} id='loader' /> : renderUsers()}
                </div>
            </div>
        </section>
    )
}