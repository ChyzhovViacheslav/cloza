import React from 'react'
import { authUser } from '../../services/AuthUser'
import Rating from '../interface/rating/Rating';
import s from './Review.module.scss'
import ReviewLoader from '../interface/loaders/ReviewLoader';
import Line from '../interface/line/Line';

interface IReviews {
    userId: string,
    reviewTime: string,
    reviewDescription: string,
    reviewRating: number;
    productKey: number
}

export default function Reviews({ userId, reviewTime, reviewDescription, reviewRating, productKey }: IReviews) {
    const { data: currentUser, isLoading } = authUser.useFetchOneUserByIdQuery<any>(userId)

    return (
        <>
            {!isLoading ? <div className={s.review}>
                {productKey === 0 ? <></> :<Line style={{marginBottom: '24px'}}/>}
                <div className={s.review__column}>
                    <div className={s.review__img}>
                        <img alt='userImg' src={`data:image/jpeg;base64,${currentUser?.image}`} />
                    </div>
                    <div className={s.review__content}>
                        <h2>{currentUser?.username}</h2>
                        <div className={s.review__time}>
                            <span>Дата публикации: {reviewTime}</span>
                        </div>
                        <p>{reviewDescription}</p>
                        <Rating reviews={reviewRating} />
                    </div>
                </div>
            </div> : 
            <ReviewLoader/>}
        </>
    )
}