import React, { useState } from 'react'
import IconSelector from '../../assets/icons/icons'
import { Link, useNavigate } from 'react-router-dom'
import s from '../../styles/styleComponents/Header.module.scss'
import Button from '../interface/button/Button'
import { loginModalSlice } from '../../store/reducers/ModalSlice'
import { useAppDispatch } from '../../hooks/redux'
import useAuth from '../../hooks/userAuth'
import { userSlice } from '../../store/reducers/UserSlice'
import { smModalSlice } from '../../store/reducers/SmModalSlice'

interface IModalAuthorized {
    loginModal: boolean
    setLoginModal: Function
}

const ModalAuthorized = ({ loginModal, setLoginModal }: IModalAuthorized) => {
    const { openModal } = loginModalSlice.actions
    const { removeUser } = userSlice.actions
    const { openSmModal, changeToFav, changeToProfile } = smModalSlice.actions
    const { isAuth } = useAuth()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    return (
        <div className={!loginModal ? s.modal : `${s.modal} ${s.active}`}>
            <div className={s.modal__body}>
                <div className={s.modal__links}>
                    <div
                        className={s.modal__link}
                        onClick={() => {
                            if (isAuth) {
                                navigate('/profile')
                            } else {
                                dispatch(changeToProfile())
                                dispatch(openSmModal())
                            }
                        }}>
                        <IconSelector className={s.modal__ico} id='person' />
                        <span>Мой аккаунт</span>
                    </div>
                    <div
                        className={s.modal__link}
                        onClick={() => {
                            if (isAuth) {
                                navigate('/favorites')
                            } else {
                                dispatch(changeToFav())
                                dispatch(openSmModal())
                            }
                        }}>
                        <IconSelector className={s.modal__ico} id='heart' />
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
                                dispatch(openModal())
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

export default function Header() {
    const { openSmModal, changeToSell } = smModalSlice.actions
    const dispatch = useAppDispatch()
    const [loginModal, setLoginModal] = useState(false)
    const { isAuth } = useAuth()
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
                            <IconSelector onClick={() => console.log('add to favorite')} className={s.header__favorite} id='heart' />
                            <span className={s.header__counter}>6</span>
                        </div>
                        <div style={{ height: '24px', position: 'relative' }}>
                            <IconSelector
                                onClick={() => {
                                    setLoginModal(!loginModal)
                                }} className={s.header__person} id='person' />
                            <ModalAuthorized
                                loginModal={loginModal}
                                setLoginModal={setLoginModal} />
                        </div>
                        <Button
                            onClick={() => {
                                if (isAuth) {
                                    navigate('/sell')
                                } else {
                                    dispatch(changeToSell())
                                    dispatch(openSmModal())
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