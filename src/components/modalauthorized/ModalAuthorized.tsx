import React, { useRef } from 'react'
import { useNavigate } from 'react-router'
import IconSelector from '../../assets/icons/icons'
import { useAppDispatch } from '../../hooks/redux'
import useAuth from '../../hooks/userAuth'
import { extraSlice } from '../../store/reducers/ExtraSlice'
import { smModalSlice } from '../../store/reducers/SmModalSlice'
import { userSlice } from '../../store/reducers/UserSlice'
import s from './ModalAuthorized.module.scss'

interface IModalAuthorized {
    loginModal: boolean
    setLoginModal: (value: boolean) => void
    setMiniModal: (value: boolean) => void
    setFavModalIsActive: (value: boolean) => void
}

export default function ModalAuthorized({ loginModal, setLoginModal, setMiniModal, setFavModalIsActive }: IModalAuthorized) {
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