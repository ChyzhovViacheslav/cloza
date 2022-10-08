import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { loginModalSlice } from '../../store/reducers/ModalSlice';
import s from '../../styles/styleComponents/LoginModal.module.scss'
import Button from '../interface/button/Button';
import Line from '../interface/line/Line';
import Modal from '../interface/modal/Modal'

interface ILoginModal {
    type: string;
}

export default function LoginModal({ type }: ILoginModal) {
    const { changeModalTypeRegister, changeModalTypeLogin } = loginModalSlice.actions
    const dispatch = useAppDispatch()

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
                    {type === 'login' ? (
                        <>
                            <h1>Вход</h1>
                            <p style={subtitle}>Введите данные, необходимые для создания учтеной записи</p>
                        </>) : (
                        <>
                            <h1>Регистрация</h1>
                            <p style={subtitle}>Если у вас есть учетная запись, пожалуйста, войдите в систему</p>
                        </>)
                    }
                </div>
                {type === 'login' ?
                    <form>
                        <label>
                            <p>E-mail</p>
                            <input placeholder='E-mail' />
                        </label>
                        <label>
                            <p>Имя</p>
                            <input placeholder='Имя' />
                        </label>
                        <label>
                            <p>Пароль</p>
                            <input placeholder='Пароль' />
                        </label>
                        <label>
                            <p>Повторите пароль</p>
                            <input placeholder='Повторите пароль' />
                        </label>
                        <Button className={s.modal} onClick={() => {
                        }} text='Войти' />
                    </form> :
                    <form>
                        <label>
                            <p>E-mail</p>
                            <input placeholder='E-mail' />
                        </label>
                        <label>
                            <p>Пароль</p>
                            <input placeholder='Пароль' />
                        </label>
                        <Button className={s.modal} onClick={() => {
                        }} text='Зарегистрироватся' />
                    </form>
                }
                {type === 'login' ?
                    <div style={{ marginTop: "32px", textAlign: 'center' }}>
                        <p style={link}>У вас ещё нет аккаунта? <span onClick={() => {
                            dispatch(changeModalTypeRegister())
                        }} style={{ color: 'var(--main-color)', fontWeight: '500' }}>Пройдите процесс регистрации</span></p>
                    </div> :
                    <div style={{ marginTop: "32px", textAlign: 'center' }}>
                        <p style={link}>У вас уже есть аккаунт? <span onClick={() => {
                            dispatch(changeModalTypeLogin())
                        }} style={{ color: 'var(--main-color)', fontWeight: '500' }}>Войдите в свою учетную запись</span></p>
                    </div>
                }
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '32px' }}>
                    <Line /><span style={{ padding: '0px 16px', ...link }}>или</span><Line />
                </div>
            </div>
        </Modal>
    )
}