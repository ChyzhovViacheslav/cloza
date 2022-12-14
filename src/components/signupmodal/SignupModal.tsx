import React, { useRef, useState, useEffect } from 'react'
import Modal from '../interface/modal/Modal'
import s from '../../styles/styleComponents/SignupModal.module.scss'
import Button from '../interface/button/Button'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loginModalSlice } from '../../store/reducers/ModalSlice';
import Line from '../interface/line/Line';
import { userSlice } from '../../store/reducers/UserSlice';
import { loaderSlice } from '../../store/reducers/LoaderSlice';
import { authUser } from '../../services/AuthUser';

interface ISignupModal {
    modalIsActive: boolean
    setModalIsActive: any
}

export default function SignupModal({modalIsActive, setModalIsActive}:ISignupModal) {
    const { changeModalTypeLogin } = loginModalSlice.actions
    const { active } = useAppSelector(state => state.modalReducer)
    const { setUser } = userSlice.actions
    const dispatch = useAppDispatch()
    const { openLoader, closeLoader } = loaderSlice.actions
    const [registerUser] = authUser.useRegisterUserMutation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [verifiedPass, setVerifiedPass] = useState('')
    const verifiedPassRef = useRef(null)
    const [isError, setError] = useState(false)

    useEffect(() => {
        return () => {
            setEmail('')
            setPassword('')
            setName('')
            setVerifiedPass('')
            setError(false)
        }
    }, [active])

    const handleSignUp = async (username: string, password: string, email: string) => {
        const currentDate = new Date().toLocaleString("ru", {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timeZone: 'Europe/Kiev',
        })
        dispatch(openLoader())
        await registerUser({
            username: username,
            password: password,
            email: email,
            registerDate: currentDate
        }).then(({ data }: any) => {
            dispatch(setUser({
                username: username,
                email: email,
                wishlist: data.wishlist,
                cartlist: data.cartlist,
                delivery_info: data.delivery_info,
                image: data.image,
                _id: data._id,
                registerDate: data.registerDate
            }))
            setError(false)
            setModalIsActive(false)
        }).catch(() => setError(true))
            .finally(() => {
                dispatch(closeLoader())
                window.location.reload()
            })
    }
    const vaildatorEmail = (email: string) => {
        const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regExp.test(email.toLowerCase())
    }

    return (
        <Modal active={modalIsActive} closeModal={setModalIsActive}>
            <div className={s.modal}>
                <div className={s.modal__title}>
                    <h1>Регистрация</h1>
                    <p className={s.modal__subtitle}>Если у вас есть учетная запись, пожалуйста, войдите в систему</p>
                </div>
                <form>
                    <label>
                        <p>E-mail</p>
                        <input
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                if (vaildatorEmail(e.target.value)) {
                                    e.target.style.border = '1px solid var(--gray-light)'
                                }
                            }}
                            placeholder='E-mail' />
                    </label>
                    <label>
                        <p>Имя</p>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Имя' />
                    </label>
                    <label>
                        <p>Пароль</p>
                        <input
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            placeholder='Пароль' />
                    </label>
                    <label>
                        <p>Повторите пароль</p>
                        <input
                            ref={verifiedPassRef}
                            value={verifiedPass}
                            onChange={(e) => {
                                setVerifiedPass(e.target.value)
                                if (e.target.value !== password) {
                                    verifiedPassRef.current.style.border = '1px solid var(--main-red)'
                                } else {
                                    verifiedPassRef.current.style.border = '1px solid var(--gray-light)'
                                }
                            }}
                            placeholder='Повторите пароль' />
                    </label>
                    <div className={s.modal__error} style={isError ? { display: 'block' } : { display: 'none' }}>
                        <span>Указаный e-mail уже существует</span>
                    </div>
                    <Button
                        className={s.modal__btn}
                        onClick={(e) => {
                            e.preventDefault()
                            if (password === verifiedPass && vaildatorEmail(email)) {
                                handleSignUp(name, password, email)
                            }
                        }}
                        text='Зарегистрироваться' />
                </form>
                <div style={{ marginTop: "32px", textAlign: 'center' }}>
                    <p className={s.modal__link}>У вас уже есть аккаунт? <span onClick={() => {
                        dispatch(changeModalTypeLogin())
                    }} style={{ color: 'var(--main-color)', fontWeight: '500', cursor: 'pointer' }}>Войдите в свою учетную запись</span></p>
                </div>
            </div>
        </Modal>
    )
}