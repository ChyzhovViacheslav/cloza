import React from 'react'
import { useNavigate } from 'react-router'
import IUser from '../../models/IUser'
import s from '../../styles/styleComponents/SalerItem.module.scss'
import Rating from '../interface/rating/Rating'

export default function SalerItem({ _id, username, image, rating, votes }: IUser) {
    const navigate = useNavigate()

    return (
        <div className={s.saleritem}>
            <div className={s.saleritem__body}>
                <div className={s.saleritem__img}>
                    <img alt='photoImg' src={`data:image/jpeg;base64,${image}`} />
                </div>
                <div className={s.saleritem__name} onClick={() => navigate(`/saler/${_id}`)}>
                    <h2>{username}</h2>
                </div>
                <div className={s.saleritem__stats}>
                    <Rating className={s.saleritem__stars} rating={rating} />
                    <span>{votes} голосов</span>
                </div>
            </div>
        </div>
    )
}