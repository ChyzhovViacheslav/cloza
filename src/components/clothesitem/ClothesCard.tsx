import React from 'react'
import IconSelector from '../../assets/icons/icons'
import s from '../../styles/styleComponents/ClothesItem.module.scss'
import Line from '../interface/line/Line'
import IProduct from '../../models/IProduct'
import { useNavigate } from 'react-router'
import preview from '../../assets/images/hdplaceholder.jpg'
import useAuth from '../../hooks/userAuth'
import { useAppDispatch } from '../../hooks/redux'
import { userSlice } from '../../store/reducers/UserSlice'
import { authUser } from '../../services/AuthUser'

export default function ClothesCard({ name, price, size, condition, id, mainPhoto, discount }: IProduct) {
  const navigate = useNavigate()
  const { isAuth, wishlist, cartlist, _id } = useAuth() as any
  const dispatch = useAppDispatch()

  const { changeWishlist, changeCartlist } = userSlice.actions

  const [changeUserInfo] = authUser.useChangeUserInfoMutation()

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

  const filterWishlist = () => {
    if (wishlist.includes(id)) {
      const newWishlist = wishlist.filter((el: string) => el !== id)
      dispatch(changeWishlist(newWishlist))

      changeUserInfo({
        id: _id,
        body: {
          wishlist: newWishlist
        }
      })
    } else {
      const newWishlist = [...wishlist, id]
      dispatch(changeWishlist(newWishlist))
      changeUserInfo({
        id: _id,
        body: {
          wishlist: newWishlist
        }
      })
    }
  }

  const filterCartlist = () => {
    if (cartlist.includes(id)) {
      const newCartlist = cartlist.filter((el: string) => el !== id)
      dispatch(changeCartlist(newCartlist))
      changeUserInfo({
        id: _id,
        body: {
          cartlist: newCartlist
        }
      })
    } else {
      const newCartlist = [...cartlist, id]
      dispatch(changeCartlist(newCartlist))
      changeUserInfo({
        id: _id,
        body: {
          cartlist: newCartlist
        }
      })
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <span className={s.item__dis_price}>{price}</span>
                <IconSelector className={s.item__price_uah_dis} id='uah' />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <span className={s.item__price}>{discount}</span>
                <IconSelector className={s.item__price_uah} id='uah' />
              </div>
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
        {isAuth ? <div className={s.item__actions}>
          <div className={s.item__wishlist_container}>
            <IconSelector
              className={wishlist.includes(id) ? `${s.item__icon} ${s.active}` : s.item__icon}
              id='heart'
              onClick={() => filterWishlist()} />
            {wishlist.includes(id) ?
              <IconSelector className={`${s.item__anim} ${s.favor}`} id='heart' />
              :
              <IconSelector className={s.item__anim} id='heart' />}
          </div>
          <div className={s.item__cartlist_containter}>
            <IconSelector
              onClick={() => filterCartlist()}
              id='cart-add'
              className={cartlist.includes(id) ? `${s.item__cart} ${s.incart}` : s.item__cart} />
          </div>
        </div> : null}
      </div>
    </div>
  )
}