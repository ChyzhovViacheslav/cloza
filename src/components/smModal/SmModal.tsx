import React from 'react'
import Modal from '../interface/modal/Modal'
import s from '../../styles/styleComponents/SmModal.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { smModalSlice } from '../../store/reducers/SmModalSlice';
import Button from '../interface/button/Button';
import { loginModalSlice } from '../../store/reducers/ModalSlice';

interface IFavModal {
    type: string
}

export default function FavModal({ type }: IFavModal) {
    const { closeSmModal } = smModalSlice.actions
    const { openModal, changeModalTypeRegister, changeModalTypeLogin } = loginModalSlice.actions
    const { active } = useAppSelector(state => state.smModalReducer)
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
            default:
                return null
        }
    }

    return (
        <Modal active={active} closeModal={closeSmModal}>
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
                            dispatch(closeSmModal())
                            dispatch(openModal())
                        }}
                        text='Войти' />
                    <Button
                        onClick={() => {
                            dispatch(changeModalTypeRegister())
                            dispatch(closeSmModal())
                            dispatch(openModal())
                        }}
                        className={s.modal__reg}
                        text='Зарегистрироваться' />
                </div>
            </div>
        </Modal>
    )
}