import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { loginModalSlice } from '../../store/reducers/ModalSlice';
import s from '../../styles/styleComponents/LoginModal.module.scss'
import Button from '../interface/button/Button';
import Line from '../interface/line/Line';
import Modal from '../interface/modal/Modal'
import { userSlice } from '../../store/reducers/UserSlice';
import { Link } from 'react-router-dom';
import { loaderSlice } from '../../store/reducers/LoaderSlice';
import { authUser } from '../../services/AuthUser';

export default function LoginModal() {
    const { changeModalTypeRegister } = loginModalSlice.actions
    const { active } = useAppSelector(state => state.modalReducer)
    const { closeModal } = loginModalSlice.actions
    const { setUser } = userSlice.actions
    const { openLoader, closeLoader } = loaderSlice.actions

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useAppDispatch()
    const [isError, setError] = useState(false)
    const [loginUser] = authUser.useLoginUserMutation()

    const handleLogin = async (email: string, password: string) => {
        dispatch(openLoader())
        await loginUser({
            email: email,
            password: password
        }).then(({ data }: any) => {
            dispatch(setUser({
                username: data.username,
                email: email,
                image: data.image
            }))
            setError(false)
            dispatch(closeModal())
        })
            .catch(() => {
                setError(true)
            })
            .finally(() => dispatch(closeLoader()))
    }

    return (
        <Modal active={active} closeModal={closeModal}>
            <div className={s.modal}>
                <div className={s.modal__title}>
                    <h1>Вход</h1>
                    <p className={s.modal__subtitle}>
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
                            type={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Пароль' />
                    </label>
                    <Link className={`${s.modal__link} ${s.modal__forgot}`} to='/'><span style={{ color: 'var(--main-color)' }}>Забыли пароль?</span></Link>
                    <div className={s.modal__error} style={isError ? { display: 'block' } : { display: 'none' }}>
                        <span>E-mail или пароль указаны неверно</span>
                    </div>
                    <Button
                        onClick={(e) => {
                            e.preventDefault()
                            handleLogin(email, password)
                        }}
                        text='Войти' />
                </form>
                <div style={{ marginTop: "32px", textAlign: 'center' }}>
                    <p className={s.modal__link}>У вас ещё нет аккаунта? <span onClick={() => {
                        dispatch(changeModalTypeRegister())
                    }} style={{ color: 'var(--main-color)', fontWeight: '500', cursor: 'pointer' }}>Пройдите процесс регистрации</span></p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '32px' }}>
                    <Line /><span className={s.modal__link} style={{ padding: '0px 16px' }}>или</span><Line />
                </div>
            </div>
        </Modal>
    )
}