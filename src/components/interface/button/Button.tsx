import React from 'react'
import IconSelector from '../../../assets/icons/icons';
import './Button.scss'

type IButton = {
    text: string;
    className?: string;
    id?: string;
    type?: any;
    onClick?: (e?: React.FormEvent) => void;
}

export default function Button({ text, className, id, type, onClick }: IButton) {
    return (
        <button type={type} onClick={onClick} className={`${className} button`}>
            <span>{text}</span>
            <IconSelector id={`${id}`} className='button__ico'/>
        </button>
    )
}