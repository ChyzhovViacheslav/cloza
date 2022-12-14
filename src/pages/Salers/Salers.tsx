import React, { useState } from 'react'
import IconSelector from '../../assets/icons/icons'
import MySelect from '../../components/interface/inputs/MySelect'
import ShowTotalItems from '../../components/interface/showTotalItems/ShowTotalItems'
import LocalSearch from '../../components/localsearch/LocalSearch'
import Pagination from '../../components/pagination/Pagination'
import SalerItem from '../../components/salerItem/SalerItem'
import IUser from '../../models/IUser'
import { authUser } from '../../services/AuthUser'
import s from '../../styles/styleComponents/Salers.module.scss'

export default function Salers() {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')

    const { data: users, isLoading: usersIsLoading, isFetching: usersIsFethcing } = authUser.useFetchAllUsersQuery({
        page: currentPage,
        limit: 12
    })

    const renderUsers = () => {
        const filtredUser = users?.users.filter((el: IUser) => {
            return el.username.toLowerCase().includes(searchTerm.toLowerCase())
        })

        if (searchTerm.length > 0) {
            return (
                filtredUser.map((el: IUser, i: number) => {
                    return (
                        <SalerItem
                            _id={el._id}
                            username={el.username}
                            image={el.image}
                            key={i} />
                    )
                })
            )
        } else {
            return (
                users?.users.map((el: IUser, i: number) => {
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
    }

    return (
        <div className={s.salers}>
            <div className={s.salers__body}>
                <LocalSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <div className={s.salers__sort}>
                    <ShowTotalItems
                        currentPage={currentPage}
                        spreading={12}
                        totalItems={users?.totalUsers}
                        currentItems={users?.users.length} />
                </div>
                <div className={s.salers__content}>
                    {usersIsLoading || usersIsFethcing ? <IconSelector className={s.salers__loader} id='loader' /> : renderUsers()}
                </div>
                <Pagination
                    className={s.salers__pagination}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={users?.totalPages} />
            </div>
        </div>
    )
}