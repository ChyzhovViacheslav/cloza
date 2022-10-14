import React, { useRef, useState, useEffect } from 'react'
import Modal from '../interface/modal/Modal'
import s from '../../styles/styleComponents/SignupModal.module.scss'
import Button from '../interface/button/Button'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loginModalSlice } from '../../store/reducers/ModalSlice';
import Line from '../interface/line/Line';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { userSlice } from '../../store/reducers/UserSlice';
import { loaderSlice } from '../../store/reducers/LoaderSlice';
import { postApi } from '../../services/PostService';

export default function SignupModal() {
    const { closeModal, changeModalTypeLogin } = loginModalSlice.actions
    const { active } = useAppSelector(state => state.modalReducer)
    const { setUser } = userSlice.actions
    const dispatch = useAppDispatch()
    const { openLoader, closeLoader } = loaderSlice.actions

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [verifiedPass, setVerifiedPass] = useState('')
    const verifiedPassRef = useRef(null)
    const [isError, setError] = useState(false)
    const [addUser, { }] = postApi.useAddUserMutation()

    useEffect(() => {
        return () => {
            setEmail('')
            setPassword('')
            setName('')
            setVerifiedPass('')
            setError(false)
        }
    }, [active])

    const handleSignUp = (email: string, password: string, name: string) => {
        const auth = getAuth()
        dispatch(openLoader())
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    userName: name
                }))
                addUser({
                    email: user.email,
                    id: user.uid,
                    userName: name
                }).unwrap()
                setError(false)
                dispatch(closeModal())
            })
            .catch(() => setError(true))
            .finally(() => window.location.reload())
    }

    const vaildatorEmail = (email: string) => {
        const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regExp.test(email.toLowerCase())
    }

    return (
        <Modal active={active} closeModal={closeModal}>
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
                                handleSignUp(email, password, name)
                            }
                        }}
                        text='Зарегистрироваться' />
                </form>
                <div style={{ marginTop: "32px", textAlign: 'center' }}>
                    <p className={s.modal__link}>У вас уже есть аккаунт? <span onClick={() => {
                        dispatch(changeModalTypeLogin())
                    }} style={{ color: 'var(--main-color)', fontWeight: '500' }}>Войдите в свою учетную запись</span></p>
                </div>
                <div
                    style={{ display: 'flex', alignItems: 'center', marginTop: '32px' }}>
                    <Line />
                    <span className={s.modal__link} style={{ padding: '0px 16px' }}>или</span>
                    <Line />
                </div>
            </div>
        </Modal>
    )
}