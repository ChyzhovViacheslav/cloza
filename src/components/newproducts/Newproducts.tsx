import React, { useState, useEffect } from 'react'
import s from '../../styles/styleComponents/NewProducts.module.scss'
import MySelect from '../interface/inputs/MySelect'
import Line from '../interface/line/Line'
import Products from '../products/Products'

export default function NewProducts() {
    const [currentSort, setSort] = useState("Рекомендации")
    const [currentCategory, setCategory] = useState('Мужское')
    const categories = ['Мужское', 'Женское', 'Унисекс']

    const renderCategories = categories.map((el: string, i: number) => {
        return (
            <div
                className={currentCategory === el ? `${s.newproducts__nav_btn} ${s.active}` : s.newproducts__nav_btn}
                key={i}
                onClick={() => {
                    setCategory(el)
                }}>
                <span>{el}</span>
            </div>
        )
    })

    return (
        <div className={s.newproducts}>
            <div className={s.newproducts__body}>
                <div className={s.newproducts__nav}>
                    <div className={s.newproducts__nav_body}>
                        {renderCategories}
                        <Line style={{position: 'absolute', bottom: '0', zIndex: '1'}}/>
                    </div>
                </div>
                <div className={s.newproducts__area}>
                    <div className={s.newproducts__area_title}>
                        <div className={s.newproducts__area_text}>
                            <p>Недавние поступления</p>
                            <h1>Новые товары</h1>
                        </div>
                        <div className={s.newproducts__area_sorted}>
                            <span>Сортировать: </span>
                            <MySelect
                                data={["Новые предложения", "Цена по возрастанию", "Цена по убыванию"]}
                                onChange={(e) => setSort(e.target.value)}
                                defaultValue={"Рекомендации"} />
                        </div>
                    </div>
                    <div className={s.newproducts__area_body}>
                        <Products currentCategory={currentCategory} currentSort={currentSort} numberOfElements={8} />
                    </div>
                </div>
            </div>
        </div>
    )
}