import React, { useState } from 'react'
import IconSelector from '../../assets/icons/icons'
import { Link, useNavigate } from 'react-router-dom'
import s from './Header.module.scss'
import Button from '../interface/button/Button'
import { useAppDispatch } from '../../hooks/redux'
import useAuth from '../../hooks/userAuth'
import { smModalSlice } from '../../store/reducers/SmModalSlice'
import CartListModal from '../cartlistmodal/CartListModal'
import ModalAuthorized from '../modalauthorized/ModalAuthorized'

interface IHeader {
    setModalIsActive: (value: boolean) => void
    setFavModalIsActive: (value: boolean) => void
}

export default function Header({ setModalIsActive, setFavModalIsActive }: IHeader) {
    const { changeToSell } = smModalSlice.actions
    const dispatch = useAppDispatch()
    const [miniModalIsActive, setMiniModalIsActive] = useState(false)
    const [cartModal, setCartModal] = useState(false)
    const { isAuth, cartlist } = useAuth()
    const navigate = useNavigate()

    return (
        <nav className={s.header}>
            <div className={s.header + ' _container'}>
                <div className={s.header__body}>
                    <Link to='/'><IconSelector className={s.header__logo} id='logo' /></Link>
                    <div className={s.header__links}>
                        <Link to='/male'>
                            <h2>Мужское</h2>
                        </Link>
                        <Link to='/female'><h2>Женское</h2></Link>
                        <Link to='/unisex'><h2>Унисекс</h2></Link>
                        <Link to='/sale'><h2 style={{ color: 'var(--main-red)' }}>Sale</h2></Link>
                        <Link to='/faq'><h2>FAQ</h2></Link>
                        <Link to='/security'><h2>Безопасная сделка</h2></Link>
                        <Link to='/rules'><h2>Правила пользования</h2></Link>
                    </div>
                    <div className={s.header__actives}>
                        <div style={{ position: 'relative', height: '20px' }}>
                            <IconSelector
                                className={s.header__cart}
                                onClick={() => {
                                    setCartModal(!cartModal)
                                    setMiniModalIsActive(false)
                                }}
                                id='cart' />
                            {isAuth === true ?
                                <span className={s.header__counter}>
                                    {cartlist.length > 99 ? '99+' : cartlist.length}
                                </span> : <></>}
                            {isAuth === true ? <CartListModal
                                setCartModal={setCartModal}
                                cartModal={cartModal} /> : <></>}
                        </div>
                        <div style={{ height: '24px', position: 'relative' }}>
                            <IconSelector
                                className={s.header__person} id='person'
                                onClick={() => {
                                    setMiniModalIsActive(!miniModalIsActive)
                                    setCartModal(false)
                                }} />
                            <ModalAuthorized
                                setFavModalIsActive={setFavModalIsActive}
                                loginModal={miniModalIsActive}
                                setLoginModal={setMiniModalIsActive}
                                setMiniModal={setModalIsActive} />
                        </div>
                        <Button
                            onClick={() => {
                                if (isAuth) {
                                    navigate('/sell')
                                } else {
                                    dispatch(changeToSell())
                                    setFavModalIsActive(true)
                                }
                            }}
                            text='Продать'
                            className='header__button' />
                    </div>
                </div>
            </div>
        </nav>
    )
}