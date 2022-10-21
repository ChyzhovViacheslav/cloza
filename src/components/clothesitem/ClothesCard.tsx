import React, { useEffect } from 'react'
import IconSelector from '../../assets/icons/icons'
import { useAppSelector } from '../../hooks/redux'
import s from '../../styles/styleComponents/ClothesItem.module.scss'
import Line from '../interface/line/Line'
import IProduct from '../../models/IProduct'
import { useNavigate } from 'react-router'
import { postApi } from '../../services/PostService'


export default function ClothesCard({ name, price, size, condition, id }: IProduct) {
  const navigate = useNavigate()

  return (
    <div className={s.item}>
      <div className={s.item__body}>
        <div className={s.item__img}>
          <img src={require("../../assets/images/placeholder.jpg")} alt='img' />
        </div>
        <div className={s.item__inf}>
          <IconSelector id='verified-user' className={s.item__verified} />
          <div className={s.item__name}>
            <h2 onClick={() => { navigate(`/product/${id}`) }}>{name}</h2>
          </div>
          <span className={s.item__price}>{price}</span>
          <IconSelector className={s.item__price_uah} id='uah'/>
        </div>
        <Line className={s.item__line} />
        <div className={s.item__condition}><span>{condition}</span></div>
        <div className={s.item__size}><span>{size}</span></div>
        <IconSelector id='heart' className={s.item__favorite} />
      </div>
    </div>
  )
}