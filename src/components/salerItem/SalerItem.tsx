import React from 'react'
import { useNavigate } from 'react-router'
import IUser from '../../models/IUser'
import { extraApi } from '../../services/ExtraService'
import s from './SalerItem.module.scss'
import Rating from '../interface/rating/Rating'

export default function SalerItem({ _id, username, image }: IUser) {
    const navigate = useNavigate()

    const { data: reviews } = extraApi.useGetAllReviewQuery({
        page: 1,
        limit: 10,
        userId: _id
    })

    return (
        <div className={s.saleritem}>
            <div className={s.saleritem__body}>
                <div className={s.saleritem__img}>
                    <img alt='photoImg' src={`data:image/jpeg;base64,${image}`} />
                </div>
                <div
                    className={s.saleritem__name}
                    onClick={() => navigate(`/saler/${_id}`)}>
                    <h2>{username}</h2>
                </div>
                <div className={s.saleritem__stats}>
                    <Rating className={s.saleritem__stars} reviews={reviews?.allReviews} />
                    <span>{reviews?.totalReviews} голосов</span>
                </div>
            </div>
        </div>
    )
}