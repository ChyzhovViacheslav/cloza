import React, {useEffect} from 'react'
import { useLocation } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import Filter from '../filter/Filter'
import s from '../../styles/styleComponents/ClothesType.module.scss'

interface IClothesType {
    title?: string,
    children: JSX.Element | JSX.Element[]
}

export default function ClothesType({title, children}: IClothesType) {
    return(
        <div className={s.clothestype}>
            <div className={s.clothestype__body}>
                <div className={s.clothestype__content}>
                    {children}
                </div>
                <Filter/>
            </div>
        </div>
    )
}