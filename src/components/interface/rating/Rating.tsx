import React from 'react'
import IconSelector from '../../../assets/icons/icons'
import s from './Rating.module.scss'

interface IRating {
    rating: number,
    className?: string
}

export default function Rating({className, rating}: IRating) {
    const renderRating = () => {
        const indexes = []

        if (Number.isInteger(rating)) {
            for (let index = 0; index < 5; index++) {
                if (rating > index) {
                    indexes.push(1)
                } else indexes.push(0)
            }
        } else {
            indexes.push(2)
            for (let index = 0; index < 4; index++) {
                if (Math.trunc(rating) > index) {
                    indexes.unshift(1)
                } else indexes.push(0)
            }
        }

        return (
            indexes.map((el: number, i: number) => {
                switch (el) {
                    case 1: return <IconSelector className={className} id='star-fill' key={i}/>
                    case 2: return <IconSelector className={className} id='star-half' key={i}/>
                    case 0: return <IconSelector className={className} id='star-empty' key={i}/>
                }
            })
        )
    }

    return (
        <div style={{display: 'flex', alignItems: "center"}}>
            {renderRating()}
        </div>
    )
}