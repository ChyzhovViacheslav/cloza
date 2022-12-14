import React, {useEffect} from 'react'
import IconSelector from '../../../assets/icons/icons'
import s from './SuccessModal.module.scss'

interface ISuccessModal {
    modalIsActive: boolean
    setModalIsActive: (e: boolean) => void
    successText: string
}
export default function SuccessModal({ successText, modalIsActive, setModalIsActive }: ISuccessModal) {
    useEffect(() => {
        setTimeout(() => {
            setModalIsActive(false)
        }, 5000);
    }, [modalIsActive])
    return (
        <div className={modalIsActive ? `${s.modal} ${s.active}` : s.modal}>
            <span>{successText}</span>
            <IconSelector id='success' />
        </div>
    )
}