import React from 'react'
import IconSelector from '../../assets/icons/icons'
import s from '../../styles/styleComponents/ClothesItem.module.scss'
import Line from '../interface/line/Line'
import IProduct from '../../models/IProduct'
import { useNavigate } from 'react-router'
import preview from '../../assets/images/hdplaceholder.jpg'

export default function ClothesCard({ name, price, size, condition, id, mainPhoto, discount }: IProduct) {
  const navigate = useNavigate()

  const renamedCondition = () => {
    switch (condition) {
      case 'novaya_s_birkoy': return 'Новая с биркой'
      case 'novaya_bez_birki': return 'Новая без бирки'
      case 'nebolshie_defekti': return 'Небольшие дефекты'
      case 'nadevalas_odin_raz': return 'Надевалась один раз'
      case 'nadevalas_neskolko_raz': return 'Надевалась несколько раз'
      default: return condition
    }
  }

  return (
    <div className={s.item}>
      <div className={s.item__body}>
        <div className={s.item__img}>
          {mainPhoto ? <img src={mainPhoto} alt='img' /> : <img src={preview} alt='img' />}
          {discount ?
            <div className={s.item__adtinfo}>
              <div className={s.item__discount}><span>Sale</span></div>
            </div>
            : null}
        </div>
        <div className={s.item__inf}>
          <IconSelector id='verified-user' className={s.item__verified} />
          <div className={s.item__name}>
            <h2 onClick={() => { navigate(`/product/${id}`) }}>{name}</h2>
          </div>
          {discount ?
            <div className={s.item__discount_price}>
              <span className={s.item__dis_price}>{price}</span>
              <IconSelector className={s.item__price_uah_dis} id='uah' />
              <span className={s.item__price}>{discount}</span>
              <IconSelector className={s.item__price_uah} id='uah' />
            </div>
            :
            <>
              <span className={s.item__price}>{price}</span>
              <IconSelector className={s.item__price_uah} id='uah' />
            </>}
        </div>
        <Line className={s.item__line} />
        <div className={s.item__condition}><span>{renamedCondition()}</span></div>
        <div className={s.item__size}><span>{size}</span></div>
        <IconSelector id='heart' className={s.item__favorite} />
      </div>
    </div>
  )
}