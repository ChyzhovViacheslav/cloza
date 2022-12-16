import React from 'react'
import Modal from '../interface/modal/Modal'
import s from './SmModal.module.scss';
import { useAppDispatch } from '../../hooks/redux';
import Button from '../interface/button/Button';
import { loginModalSlice } from '../../store/reducers/ModalSlice';

interface IFavModal {
    type: string
    favModalIsActive: boolean,
    setFavModalIsActive: (value: boolean) => void
    setModalIsActive?: any
}

export default function FavModal({ type, favModalIsActive, setFavModalIsActive, setModalIsActive }: IFavModal) {
    const { changeModalTypeRegister, changeModalTypeLogin } = loginModalSlice.actions
    const dispatch = useAppDispatch()

    const subtitle = () => {
        switch (type) {
            case 'fav':
                return (
                    <p>Для просмотра избранных товаров, необходимо войти или зарегистрироваться!</p>
                )
            case 'profile':
                return (
                    <p>Для входа в личный кабинет необходимо войти или зарегистрироваться!</p>
                )
            case 'sell':
                return (
                    <p>Для размещения товара на продажу, необходимо войти или зарегистрироваться!</p>
                )
            case 'cart':
                return (
                    <p>Для добавления товара в корзину, необходимо войти или зарегистрироваться!</p>
                )
            
            default:
                return null
        }
    }

    return (
        <Modal active={favModalIsActive} closeModal={setFavModalIsActive}>
            <div className={s.modal}>
                <div className={s.modal__title}>
                    <h1>Необходима авторизация</h1>
                </div>
                <div className={s.modal__subtitle}>
                    {subtitle()}
                </div>
                <div className={s.modal__btns}>
                    <Button
                        onClick={() => {
                            dispatch(changeModalTypeLogin())
                            setFavModalIsActive(false)
                            setModalIsActive(true)
                        }}
                        text='Войти' />
                    <Button
                        onClick={() => {
                            dispatch(changeModalTypeRegister())
                            setFavModalIsActive(false)
                            setModalIsActive(true)
                        }}
                        className={s.modal__reg}
                        text='Зарегистрироваться' />
                </div>
            </div>
        </Modal>
    )
}