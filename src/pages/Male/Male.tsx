import React, { useEffect } from 'react'
import s from '../../styles/styleComponents/Male.module.scss'
import ClothesCard from '../../components/clothesitem/ClothesCard'
import ClothesType from '../../components/clothestype/ClothesType'
import { postApi } from '../../services/PostService'
import IconSelector from '../../assets/icons/icons'
import { useAppSelector } from '../../hooks/redux'

export default function Male() {
    const { products, isLoading, newProducts } = useAppSelector(state => state.filterReducet)
    const maleProduct = newProducts?.filter((el: any) => {
        return el.mainCategory === "male"
    })

    const productList = maleProduct?.map((el: any) => {
        return (
            <ClothesCard
                key={el.id}
                saler={el.saler}
                name={el.name}
                condition={el.condition}
                mainCategory={el.condition}
                category={el.category}
                subCategory={el.subCategory}
                brand={el.brand}
                size={el.size}
                color={el.color}
                description={el.description}
                price={el.price}
                amount={el.amount}
                trade={el.trade} />
        )
    })

    return (
        <ClothesType>
            {isLoading ? <IconSelector className={s.male__loader} id='loader' /> : productList}
        </ClothesType>
    )
}