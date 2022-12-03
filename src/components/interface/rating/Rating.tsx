import React from 'react'
import IconSelector from '../../../assets/icons/icons'

interface IRating {
    className?: string
    reviews: any
}

export default function Rating({ reviews, className }: IRating) {
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

    return <IconSelector
        className={className}
        id='rating'
        percent={ratingSum(reviews)} />
}