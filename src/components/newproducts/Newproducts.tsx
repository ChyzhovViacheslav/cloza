import React, { useState } from 'react'
import s from './NewProducts.module.scss'
import MySelect from '../interface/inputs/MySelect'
import Line from '../interface/line/Line'
import Products from '../products/Products'

export default function NewProducts() {
    const [sortByPrice, setSortByPrice] = useState(0)
    const [currentCategory, setCategory] = useState('male')
    const categories = ['male', 'female', 'unisex']

    const renderCategories = categories.map((el: string, i: number) => {
        const renamedCategory = () => {
            switch (el) {
                case 'male': return 'Мужское'
                case 'female': return 'Женское'
                case 'unisex': return 'Унисекс'
                default: return el
            }
        }
        return (
            <div
                className={currentCategory === el ? `${s.newproducts__nav_btn} ${s.active}` : s.newproducts__nav_btn}
                key={i}
                onClick={() => {
                    setCategory(el)
                }}>
                <span>{renamedCategory()}</span>
            </div>
        )
    })

    return (
        <section className={s.newproducts}>
            <div className={s.newproducts__body}>
                <div className={s.newproducts__nav}>
                    <div className={s.newproducts__nav_body}>
                        {renderCategories}
                        <Line style={{ position: 'absolute', bottom: '0', zIndex: '1' }} />
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
                                data={["Цена по возрастанию", "Цена по убыванию"]}
                                onChange={(e) => {
                                    switch (e.target.value) {
                                        case 'Цена по возрастанию': setSortByPrice(1)
                                            break;
                                        case 'Цена по убыванию': setSortByPrice(-1)
                                            break;
                                        default: setSortByPrice(0);
                                    }
                                }}
                                defaultValue={"Рекомендации"} />
                        </div>
                    </div>
                    <div className={s.newproducts__area_body}>
                        <Products currentMainCategory={currentCategory} sortByPrice={sortByPrice} limit={8} />
                    </div>
                </div>
            </div>
        </section>
    )
}