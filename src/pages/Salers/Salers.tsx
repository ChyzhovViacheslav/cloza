import React, { useState } from 'react'
import IconSelector from '../../assets/icons/icons'
import MySelect from '../../components/interface/inputs/MySelect'
import ShowTotalItems from '../../components/interface/showTotalItems/ShowTotalItems'
import Pagination from '../../components/pagination/Pagination'
import SalerItem from '../../components/salerItem/SalerItem'
import IUser from '../../models/IUser'
import { authUser } from '../../services/AuthUser'
import s from '../../styles/styleComponents/Salers.module.scss'

export default function Salers() {
    const [currentPage, setCurrentPage] = useState(1)
    const [sortByRating, setSortByRating] = useState(0)

    const { data: users, isLoading: usersIsLoading, isFetching: usersIsFethcing } = authUser.useFetchAllUsersQuery({
        sortByRating: sortByRating,
        page: currentPage,
        limit: 12
    })

    const renderUsers = () => {
        return (
            users?.users.map((el: IUser, i: number) => {
                return (
                    <SalerItem
                        name={el.username}
                        photo={el.image}
                        rating={el.rating}
                        votes={el.votes}
                        key={i} />
                )
            })
        )
    }

    return (
        <div className={s.salers}>
            <div className={s.salers__body}>
                <div className={s.salers__sort}>
                    <ShowTotalItems
                        currentPage={currentPage}
                        spreading={12}
                        totalItems={users?.totalUsers}
                        currentItems={users?.users.length} />
                    <div className={s.salers__select}>
                        <span>Сортировать:</span>
                        <MySelect
                            className={s.salers__myselect}
                            data={["Новые предложения", "По высокому рейтингу", "По низкому рейтингу"]}
                            onChange={(e) => {
                                switch (e.target.value) {
                                    case 'По высокому рейтингу': setSortByRating(-1)
                                        break;
                                    case 'По низкому рейтингу': setSortByRating(1)
                                        break;
                                    default: setSortByRating(0);
                                }
                            }}
                            defaultValue={"Рекомендации"} />
                    </div>
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