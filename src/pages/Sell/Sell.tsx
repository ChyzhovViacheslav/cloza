import React from 'react'
import s from '../../styles/styleComponents/Sell.module.scss';

export default function Sell() {
  return (
    <div className={s.sell}>
        <div className={s.sell__body}>
            <div className={s.sell__title}>
                <h1>Выставить товар на продажу</h1>
            </div>
            <form className={s.sell__form}></form>
        </div>
    </div>
  )
}