import React, {useEffect} from 'react'
import { useLocation } from 'react-router'
import { useAppDispatch } from '../../hooks/redux'
import { pathNameSlice } from '../../store/reducers/PathnameSlice'
import Filter from '../filter/Filter'
import s from '../../styles/styleComponents/ClothesType.module.scss'

interface IClothesType {
    title?: string,
    children: JSX.Element | JSX.Element[]
}

export default function ClothesType({title, children}: IClothesType) {
    const {changePath} = pathNameSlice.actions
    const dispatch = useAppDispatch()
    const initialPath = useLocation()

    useEffect(() => {
        dispatch(changePath(`/${initialPath.pathname.split('/')[1]}`))
    }, [])

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