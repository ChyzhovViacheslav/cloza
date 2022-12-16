import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import IconSelector from '../../assets/icons/icons'
import { filterSlice } from '../../store/reducers/ProductFilter'
import s from './BrandsItem.module.scss'

type IBrandsItem = {
  name: string
}

export default function BrandsItem({ name }: IBrandsItem) {
  const { setBrands } = filterSlice.actions

  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div
      className={s.brandsitem}
      onClick={() => {
        dispatch(setBrands([name]))
        navigate(`/male`)
      }}>
      <div className={s.brandsitem__body}>
        <div className={s.brandsitem__img}>
          <IconSelector id='adidas' />
        </div>
        <div className={s.brandsitem__link}>
          <h4>{name}</h4>
          <IconSelector className={s.brandsitem__ico} id='east' /></div>
      </div>
    </div>
  )
}