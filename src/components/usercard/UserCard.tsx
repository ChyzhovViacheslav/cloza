import React from 'react'
import IconSelector from '../../assets/icons/icons'
import { extraApi } from '../../services/ExtraService'
import s from '../../styles/styleComponents/UserCard.module.scss'
import UserCardLoader from '../interface/loaders/UserCardLoader'
import UserCardLoaderSmall from '../interface/loaders/UserCardLoaderSmall'
import Rating from '../interface/rating/Rating'

interface IUserCard {
    salerName: string,
    salerRating: number,
    salerVotes: number,
    salerLoading: boolean,
    productsLength: number,
    salerImage: string,
    imageSize: string,
    reviews: any,
}

export default function UserCard({ imageSize, salerImage, salerName, reviews, salerVotes, salerLoading, productsLength }: IUserCard) {
    const currentLoader = imageSize === '96px' ? <UserCardLoader/> : <UserCardLoaderSmall/>
    
    const ratingSum = (rating:any) => {
        let sum = 0
        for (let index = 0; index < rating?.length; index++) {
            sum = sum + rating[index]?.rating
        }
        return ((sum / rating?.length) / 5) * 100
    }

    return (
        <>
            {salerLoading ? currentLoader : <div className={s.saler}>
                <div className={s.saler__image} style={{ width: imageSize, height: imageSize }}>
                    <img
                        src={`data:image/jpeg;base64,${salerImage}`}
                        alt='salerImg' />
                </div>
                <div className={s.saler__content} style={{ rowGap: '8px' }}>
                    <div className={s.saler__title} style={imageSize === '96px' ? { flexDirection: 'column' } : { flexDirection: 'row' }}>
                        <h2 style={imageSize === '96px' ? { color: 'var(--text-title)', fontWeight: '500' } : { color: 'var(--text-paragraph)' }}>{salerName}</h2>
                        <span style={imageSize === '96px' ? { marginLeft: '0px', marginTop: '8px' } : { marginLeft: '6px' }}><h2>{imageSize === '96px' ? 'Н' : 'н'}а cloza с 11.09.22</h2></span>
                    </div>
                    <div className={s.saler__rate}>
                        {/* <Rating className={s.saler__stars} rating={salerRating} /> */}
                        <IconSelector id='rating' percent={`${ratingSum(reviews)}`}/>
                        <h2>{salerVotes} голосов</h2>
                    </div>
                    <div className={s.saler__amount}>
                        <h2>Товаров в наличии:</h2>
                        <h2>{productsLength}</h2>
                    </div>
                </div>
            </div>}
        </>
    )
}