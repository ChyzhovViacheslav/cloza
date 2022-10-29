import React, { useState } from 'react'
import ProductArea from '../../components/clothestype/ProductArea'
import { useAppSelector } from '../../hooks/redux'
import MySelect from '../../components/interface/inputs/MySelect'   

export default function Male() {
    const { newProducts } = useAppSelector(state => state.filterReducer)

    const maleProduct = newProducts?.filter((el: any) => {
        return el.mainCategory === "Мужское"
    })

    const [currentSort, setSort] = useState("Рекомендации")

    return (
        <ProductArea currentSort={currentSort} data={maleProduct}>
            <MySelect
                data={["Новые предложения", "Цена по возрастанию", "Цена по убыванию"]}
                onChange={(e) => setSort(e.target.value)}
                defaultValue={"Рекомендации"} />
        </ProductArea>
    )
}