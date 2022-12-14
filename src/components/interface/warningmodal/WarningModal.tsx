import React, { useEffect } from 'react'
import IconSelector from '../../../assets/icons/icons';
import s from './WarningModal.module.scss'

interface IWarningModal {
    modalIsActive: boolean;
    setModalIsActive: (e:boolean) => void
    warnText: string
}

export default function WarningModal({modalIsActive, warnText, setModalIsActive}:IWarningModal) {
    useEffect(() => {
        setTimeout(() => {
            setModalIsActive(false)
        }, 5000);
    }, [modalIsActive])

    return (
        <div className={modalIsActive ? `${s.modal} ${s.active}` : s.modal}>
            <span>{warnText}</span>
            <IconSelector id='warn'/>
        </div>
    )
}