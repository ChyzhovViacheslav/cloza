import React from 'react'
import IconSelector from '../../assets/icons/icons';
import './Button.scss'

type IButton = {
    text: string;
    className?: string;
    id?: string;
    onClick?: () => void;
}

export default function Button({ text, className, id, onClick }: IButton) {
    return (
        <button onClick={onClick} className={`${className} button`}>
            <span>{text}</span>
            <IconSelector id={`${id}`} className='button__ico'/>
        </button>
    )
}