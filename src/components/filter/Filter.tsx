import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import { pathNameSlice } from '../../store/reducers/PathnameSlice'
import s from '../../styles/styleComponents/Filter.module.scss'
import CollapsableItem from '../interface/collapsable/CollapsableItem'

export default function Filter() {
    const {path} = useAppSelector(state => state.pathNameReducer)
    return (
        <div className={s.filter}>
            <div className={s.filter__body}>
                <CollapsableItem isClosed={false} title='Цена' className={s.filter__price} tittleClassName={s.filter__title}>
                    <div className={s.filter__price_line}></div>
                    <div className={s.filter__price_value}><span>1 300₴</span> - <span>2 405₴</span></div>
                </CollapsableItem>
                <CollapsableItem isClosed={false} title='Категории' className={s.filter__categories} tittleClassName={s.filter__title}>
                    <div className={s.filter__categories_list}>
                        <Link to={`${path}/tshirt`}><h2>Рубашки</h2></Link>
                        <h2>Рубашки</h2>
                        <h2>Рубашки</h2>
                        <h2>Рубашки</h2>
                        <h2>Рубашки</h2>
                        <h2>Рубашки</h2>
                        <h2>Рубашки</h2>
                        <h2>Рубашки</h2>
                        <br/>
                        <h2>Показать ещё</h2>
                    </div>
                </CollapsableItem>
                <CollapsableItem isClosed={false} title='Бренды' className={s.filter__brands} tittleClassName={s.filter__title}>
                    <div className={s.filter__brand_current}>
                        <span>Burberry x</span>
                    </div>
                    <br />
                    <div className={s.filter__brand_list}>
                        <span>Бренды</span>
                        <div className={s.filter__brand_item}>
                            <span>Burberry</span>
                            <span>Burberry</span>
                            <span>Burberry</span>
                            <span>Burberry</span>
                            <span>Burberry</span>
                            <span>Burberry</span>
                            <span>Burberry</span>
                            <span>Burberry</span>
                            <span>Burberry</span>
                        </div>
                    </div>
                </CollapsableItem>
                <CollapsableItem isClosed={false} title='Состояние' className={s.filter__condition} tittleClassName={s.filter__title}>

                </CollapsableItem>
                <CollapsableItem isClosed={false} title='Размер одежды' className={s.filter__size_clothing} tittleClassName={s.filter__title}>

                </CollapsableItem>
                <CollapsableItem isClosed={false} title='Размер обуви' className={s.filter__size_shoes} tittleClassName={s.filter__title}>

                </CollapsableItem>
                <CollapsableItem isClosed={false} title='Цвета' className={s.filter__colors} tittleClassName={s.filter__title}>

                </CollapsableItem>
            </div>
        </div>
    )
}