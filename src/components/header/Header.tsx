import React, { useState, useRef } from 'react'
import IconSelector from '../../assets/icons/icons'
import { Link, useNavigate } from 'react-router-dom'
import s from '../../styles/styleComponents/Header.module.scss'
import Button from '../interface/button/Button'
import { useAppDispatch } from '../../hooks/redux'
import useAuth from '../../hooks/userAuth'
import { userSlice } from '../../store/reducers/UserSlice'
import { smModalSlice } from '../../store/reducers/SmModalSlice'
import { extraSlice } from '../../store/reducers/ExtraSlice'
import CartListModal from '../cartlistmodal/CartListModal'

interface IModalAuthorized {
    loginModal: boolean
    setLoginModal: (value: boolean) => void
    setMiniModal: (value: boolean) => void
    setFavModalIsActive: (value: boolean) => void
}

const ModalAuthorized = ({ loginModal, setLoginModal, setMiniModal, setFavModalIsActive }: IModalAuthorized) => {
    const { removeUser } = userSlice.actions
    const { changeProfileTab } = extraSlice.actions
    const { changeToFav, changeToProfile } = smModalSlice.actions
    const { isAuth } = useAuth()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const currentTargetRef = useRef(null)

    return (
        <div
            ref={currentTargetRef}
            className={!loginModal ? s.modal : `${s.modal} ${s.active}`}>
            <div className={s.modal__body}>
                <div className={s.modal__links}>
                    <div
                        className={s.modal__link}
                        onClick={() => {
                            if (isAuth) {
                                navigate('/profile')
                                setLoginModal(false)
                            } else {
                                dispatch(changeToProfile())
                                setFavModalIsActive(true)
                            }
                        }}>
                        <IconSelector className={s.modal__ico} id='person' />
                        <span>Мой аккаунт</span>
                    </div>
                    <div
                        className={s.modal__link}
                        onClick={async () => {
                            if (isAuth) {
                                navigate('/profile')
                                dispatch(changeProfileTab('Список желаемого'))
                                setLoginModal(false)
                            } else {
                                dispatch(changeToFav())
                                setFavModalIsActive(true)
                            }
                        }}>
                        <IconSelector className={s.modal__ico_heart} id='heart' />
                        <span>Список желаний</span>
                    </div>
                    {isAuth ?
                        <div
                            className={s.modal__link}
                            onClick={() => {
                                dispatch(removeUser())
                                setLoginModal(false)
                                window.location.reload()
                            }}>
                            <IconSelector className={s.modal__ico} id='logout' />
                            <span>Выйти</span>
                        </div> :
                        <div
                            className={s.modal__link}
                            onClick={() => {
                                setMiniModal(true)
                                setLoginModal(false)
                            }}>
                            <IconSelector className={s.modal__ico} id='logout' />
                            <span>Войти</span>
                        </div>}
                </div>
            </div>
        </div>
    )
}

interface IHeader {
    setModalIsActive: (value: boolean) => void
    setFavModalIsActive: (value: boolean) => void
}

export default function Header({setModalIsActive, setFavModalIsActive}:IHeader) {
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
                                setMiniModal={setModalIsActive}/>
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