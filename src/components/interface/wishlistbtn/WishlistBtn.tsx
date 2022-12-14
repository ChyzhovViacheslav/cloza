import React from 'react'
import IconSelector from '../../../assets/icons/icons'
import useAuth from '../../../hooks/userAuth'
import useWishlist from '../../../hooks/useWishlist'
import s from './WishlistBtn.module.scss'

interface IWishlistBtn {
    productId: string
    size: number
}

export default function WishlistBtn({ productId, size }: IWishlistBtn) {
    const { addToWishlist, removeFromWishlist } = useWishlist()
    const { isAuth, wishlist, _id } = useAuth() as any

    return (
        <>
            {isAuth ? <div className={size === 20 ? s.btn__wishlist_container : s.btn__wishlist_container24}>
                <IconSelector
                    className={wishlist.includes(productId) ? `${size === 20 ? s.btn__icon : s.btn__icon24} ${s.active}` : `${size === 20 ? s.btn__icon : s.btn__icon24}`}
                    id='heart'
                    onClick={() => {
                        if (wishlist.includes(productId)) {
                            removeFromWishlist(_id, productId)
                        } else {
                            addToWishlist(_id, productId)
                        }
                    }} />
                {wishlist.includes(productId) ?
                    <IconSelector 
                        className={`${size === 20 ? s.btn__anim : s.btn__anim24} ${size === 20 ? s.favor20 : s.favor24}`}
                        id='heart' />
                    :
                    <IconSelector className={size === 20 ? s.btn__anim : s.btn__anim24} id='heart' />}
            </div> : null}
        </>
    )
}