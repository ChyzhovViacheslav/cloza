import React from 'react'
import s from '../../styles/styleComponents/Filter.module.scss'
import CollapsableItem from '../interface/collapsable/CollapsableItem'

export default function Filter() {
  return (
    <div className={s.filter}>
        <div className={s.filter__body}>
            <CollapsableItem isClosed={false} title='Цена' className={s.filter__price}>
                <h1>ANAL</h1>
            </CollapsableItem>
            <CollapsableItem isClosed={false} title='Категории' className={s.filter__categories}>

            </CollapsableItem>
            <CollapsableItem isClosed={false} title='Бренды' className={s.filter__brands}>

            </CollapsableItem>
            <CollapsableItem isClosed={false} title='Состояние' className={s.filter__condition}>

            </CollapsableItem>
            <CollapsableItem isClosed={false} title='Размер одежды' className={s.filter__size_clothing}>

            </CollapsableItem>
            <CollapsableItem isClosed={false} title='Размер обуви' className={s.filter__size_shoes}>

            </CollapsableItem>
            <CollapsableItem isClosed={false} title='Цвета' className={s.filter__colors}>

            </CollapsableItem>
        </div>
    </div>
  )
}