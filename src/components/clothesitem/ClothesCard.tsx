import React, { useState } from 'react'
import IconSelector from '../../assets/icons/icons'
import s from '../../styles/styleComponents/ClothesItem.module.scss'
import Line from '../interface/line/Line'
import IProduct from '../../models/IProduct'
import { useNavigate } from 'react-router'
import preview from '../../assets/images/hdplaceholder.jpg'
import useAuth from '../../hooks/userAuth'
import ICartList from '../../models/ICartList'
import useCartlist from '../../hooks/useCartlist'
import VerifiedUser from '../interface/verifieduser/VerifiedUser'
import WishlistBtn from '../interface/wishlistbtn/WishlistBtn'

export default function ClothesCard({ name, price, size, condition, id, mainPhoto, discount, saler }: IProduct) {
  const { isAuth, cartlist, _id } = useAuth() as any
  const { addToCartlist, removeFromCartlist } = useCartlist()
  const navigate = useNavigate()

  const [showVerified, setShowVerified] = useState(false)

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

  const cartlistIncludes = (id: string) => {
    let boolean = false
    cartlist.forEach((el: ICartList) => {
      if (boolean === false) {
        if (el.id === id) {
          boolean = true
        }
      }
    })
    return boolean
  }

  const filterCartlist = () => {
    if (cartlistIncludes(id)) {
      removeFromCartlist(_id, id)
    } else {
      addToCartlist(_id, id, 1)
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
          <VerifiedUser
            setShowVerified={setShowVerified}
            showVerified={showVerified}
            userId={saler.id}
            size={20} />
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
          {saler.id !== _id ?
            <>
              <WishlistBtn size={20} productId={id} />
              <div className={s.item__cartlist_containter}>
                <IconSelector
                  onClick={() => filterCartlist()}
                  id='cart-add'
                  className={cartlistIncludes(id) ? `${s.item__cart} ${s.incart}` : s.item__cart} />
              </div>
            </> 
            : <span className={s.item__your}>Это ваш товар</span>
          }
        </div> : null}
      </div>
    </div>
  )
}