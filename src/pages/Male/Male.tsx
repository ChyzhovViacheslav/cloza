import React, { useEffect } from 'react'
import s from '../../styles/styleComponents/Male.module.scss'
import ClothesCard from '../../components/clothesitem/ClothesCard'
import ClothesType from '../../components/clothestype/ClothesType'
import IconSelector from '../../assets/icons/icons'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { filterSlice } from '../../store/reducers/ProductFilter'
import { postApi } from '../../services/PostService'

export default function Male() {
    const { newProducts, currentCategory } = useAppSelector(state => state.filterReducer)
    const dispatch = useAppDispatch()
    const { setData } = filterSlice.actions
    const { data, isLoading, isSuccess } = postApi.useFetchAllProductQuery(null)

    useEffect(() => {
        if(!currentCategory){
            dispatch(setData(data))
        }
    }, [isSuccess, currentCategory])

    const maleProduct = newProducts?.filter((el: any) => {
        return el.mainCategory === "Мужское"
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
                trade={el.trade}
                id={el.id}/>
        )
    })

    return (
        <ClothesType>
            {isLoading ? <IconSelector className={s.male__loader} id='loader' /> : productList}
        </ClothesType>
    )
}