import React from 'react'
import IconSelector from '../../assets/icons/icons'
import { useAppSelector } from '../../hooks/redux'
import s from '../../styles/styleComponents/ClothesItem.module.scss'
import Line from '../interface/line/Line'

interface IClothesCard{
  // id: number
}

export default function ClothesCard({}:IClothesCard) {
  return (
    <div className={s.item}>
      <div className={s.item__body}>
        <div className={s.item__img}>
          <img src={require("../../assets/images/placeholder.jpg")} alt='img'/>    
        </div>
        <div className={s.item__inf}>
          <IconSelector id='verified-user' className={s.item__verified}/>
          <div className={s.item__name}>
            <h2>Вонючие трусы</h2>
          </div>
          <span className={s.item__price}>1 700₴</span>
        </div>
        <Line className={s.item__line}/>
        <div className={s.item__condition}><span>Поношеное</span></div>
        <div className={s.item__size}><span>XXL</span></div>
        <IconSelector id='heart' className={s.item__favorite}/>
      </div>
    </div>
  )
}