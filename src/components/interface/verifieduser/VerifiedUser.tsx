import React from 'react'
import IconSelector from '../../../assets/icons/icons'
import { extraApi } from '../../../services/ExtraService'
import s from './VerifiedUser.module.scss'

interface IVerifiedUser {
    userId: string,
    setShowVerified: (value: boolean) => void
    showVerified: boolean,
    size: number
}

export default function VerifiedUser({ userId, setShowVerified, showVerified, size }: IVerifiedUser) {
    const { data: reviews } = extraApi.useGetAllReviewQuery({
        page: 1,
        limit: 999,
        userId: userId
    })

    const checkVerified = () => {
        const ratingSum = (rating: any) => {
            if (rating?.length === undefined || Number.isInteger(rating)) {
                return (rating / 5) * 100
            } else {
                let sum = 0
                for (let index = 0; index < rating?.length; index++) {
                    sum = sum + rating[index]?.rating
                }
                return ((sum / rating?.length) / 5) * 100
            }
        }

        if (reviews?.totalReviews < 15 || ratingSum(reviews?.reviews) <= 75) {
            return null
        } else {
            return (
                <div
                    className={s.verified__verified}
                    onMouseEnter={() => setShowVerified(true)}
                    onMouseLeave={() => setShowVerified(false)}>
                    <IconSelector style={{height: `${size}px`, width: `${size}px`}} id='verified-user' />
                    <div className={showVerified ? `${s.verified__verified_show} ${s.hover}` : s.verified__verified_show}>
                        <span>Надёжный продавец</span>
                    </div>
                </div>
            )
        }
    }

    return checkVerified()
}