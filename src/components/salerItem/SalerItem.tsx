import React from 'react'
import s from '../../styles/styleComponents/SalerItem.module.scss'
import Rating from '../interface/rating/Rating'

interface ISalerItem {
    name: string,
    photo: string,
    rating: number,
    votes: number
}

export default function SalerItem({ name, photo, rating, votes }: ISalerItem) {
    return (
        <div className={s.saleritem}>
            <div className={s.saleritem__body}>
                <div className={s.saleritem__img}>
                    <img alt='photoImg' src={`data:image/jpeg;base64,${photo}`} />
                </div>
                <div className={s.saleritem__name}>
                    <h2>{name}</h2>
                </div>
                <div className={s.saleritem__stats}>
                    <Rating className={s.saleritem__stars} rating={rating}/>
                    <span>{votes} голосов</span>
                </div>
            </div>
        </div>
    )
}