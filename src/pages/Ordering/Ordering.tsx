import React from 'react'
import useAuth from '../../hooks/userAuth'
import s from '../../styles/styleComponents/Ordering.module.scss'

export default function Ordering() {
    const { cartlist } = useAuth()
    return (
        <div className={s.ordering}>
            <div className={s.ordering__body}>
                <div className={s.ordering__info}>
                    <h5>Данные для доставки</h5>
                </div>
                <div className={s.ordering__checkout}></div>
            </div>
        </div>
    )
}