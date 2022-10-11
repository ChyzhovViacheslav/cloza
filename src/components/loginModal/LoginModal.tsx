import React, { useState } from 'react'
import { useAppDispatch } from '../../hooks/redux';
import { loginModalSlice } from '../../store/reducers/ModalSlice';
import s from '../../styles/styleComponents/LoginModal.module.scss'
import Button from '../interface/button/Button';
import Line from '../interface/line/Line';
import Modal from '../interface/modal/Modal'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { userSlice } from '../../store/reducers/UserSlice';

export default function LoginModal() {
    const { changeModalTypeRegister } = loginModalSlice.actions
    const {setUser} = userSlice.actions
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { closeModal } = loginModalSlice.actions
    const dispatch = useAppDispatch()
    
    const handleLogin = (email: string, password: string) => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then(({user}) => {
                user.getIdToken().then(result => {
                    dispatch(setUser({
                        email: user.email,
                        id: user.uid,
                        token: result
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

    return (
        <Modal>
            <div className={s.modal}>
                <div className={s.modal__title}>
                    <h1>Вход</h1>
                    <p style={subtitle}>
                        Введите данные, необходимые для создания учтеной записи
                    </p>
                </div>
                <form>
                    <label>
                        <p>E-mail</p>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='E-mail' />
                    </label>
                    <label>
                        <p>Пароль</p>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Пароль' />
                    </label>
                    <Button
                        className={s.modal__btn}
                        onClick={(e) => {
                            e.preventDefault()
                            handleLogin(email, password)
                            dispatch(closeModal())
                        }}
                        text='Войти' />
                </form>
                <div style={{ marginTop: "32px", textAlign: 'center' }}>
                    <p style={link}>У вас ещё нет аккаунта? <span onClick={() => {
                        dispatch(changeModalTypeRegister())
                    }} style={{ color: 'var(--main-color)', fontWeight: '500' }}>Пройдите процесс регистрации</span></p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '32px' }}>
                    <Line /><span style={{ padding: '0px 16px', ...link }}>или</span><Line />
                </div>
            </div>
        </Modal>
    )
}