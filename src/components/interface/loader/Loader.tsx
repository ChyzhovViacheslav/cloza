import React from 'react'
import IconSelector from '../../../assets/icons/icons';
import s from './Loader.module.scss';
type ILoader = {
    isLoading: boolean
}

export default function Loader({ isLoading }: ILoader) {
    return (
        <div className={isLoading ? `${s.loader} ${s.isload}` : s.loader}>
            <IconSelector id='loader' className={s.loader__ico}></IconSelector>
        </div>
    )
}