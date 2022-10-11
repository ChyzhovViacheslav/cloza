import React, { useRef, useState } from 'react'
import Modal from '../interface/modal/Modal'
import s from '../../styles/styleComponents/SignupModal.module.scss'
import Button from '../interface/button/Button'
import { useAppDispatch } from '../../hooks/redux';
import { loginModalSlice } from '../../store/reducers/ModalSlice';
import Line from '../interface/line/Line';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { userSlice } from '../../store/reducers/UserSlice';

export default function SignupModal() {
    const { closeModal, changeModalTypeLogin } = loginModalSlice.actions
    const dispatch = useAppDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [verifiedPass, setVerifiedPass] = useState('')
    const verifiedPassRef = useRef(null)
    const { setUser } = userSlice.actions

    const handleSignUp = (email: string, password: string) => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                user.getIdToken().then(result => {
                    dispatch(setUser({
                        email: user.email,
                        id: user.uid,
                        token: result,
                        name: name
                    }))
                })
            })
            .catch((e) => alert(e.message))
    }

    const subtitle = {
        marginTop: '15px',
        textAlign: 'center',
        whiteSpace: 'nowrap',
        fontWeight: '400',
        fontSize: '16px',
        lineHeight: '20px',
        color: '#9095A9'
    } as React.CSSProperties

    const link = {
        fontSize: '16px',
        lineHeight: '20px',
        fontWeight: '400',
        color: '#9095a9'
    } as React.CSSProperties

    const vaildatorEmail = (email: string) => {
        const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regExp.test(email.toLowerCase())
    }

    return (
        <Modal>
            <div className={s.modal}>
                <div className={s.modal__title}>
                    <h1>Регистрация</h1>
                    <p style={subtitle}>Если у вас есть учетная запись, пожалуйста, войдите в систему</p>
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
                            onBlur={(e) => {
                                if (vaildatorEmail(e.target.value)) {
                                    verifiedPassRef.current.style.border = '1px solid var(--gray-light)'
                                } else {
                                    e.target.style.border = '1px solid var(--main-red)'
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
                    <Button
                        className={s.modal__btn}
                        onClick={(e) => {
                            e.preventDefault()
                            if (password === verifiedPass && vaildatorEmail(email)) {
                                handleSignUp(email, password)
                                dispatch(closeModal())
                            } else {

                            }
                        }}
                        text='Зарегистрироваться' />
                </form>
                <div style={{ marginTop: "32px", textAlign: 'center' }}>
                    <p style={link}>У вас уже есть аккаунт? <span onClick={() => {
                        dispatch(changeModalTypeLogin())
                    }} style={{ color: 'var(--main-color)', fontWeight: '500' }}>Войдите в свою учетную запись</span></p>
                </div>
                <div
                    style={{ display: 'flex', alignItems: 'center', marginTop: '32px' }}>
                    <Line />
                    <span style={{ padding: '0px 16px', ...link }}>или</span>
                    <Line />
                </div>
            </div>
        </Modal>
    )
}