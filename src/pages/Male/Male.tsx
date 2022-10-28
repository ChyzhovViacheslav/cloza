import React, { useEffect, useState } from 'react'
import s from '../../styles/styleComponents/Male.module.scss'
import ClothesCard from '../../components/clothesitem/ClothesCard'
import ProductArea from '../../components/clothestype/ProductArea'
import IconSelector from '../../assets/icons/icons'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { filterSlice } from '../../store/reducers/ProductFilter'
import { postApi } from '../../services/PostService'
import MySelect from '../../components/interface/inputs/MySelect'

export default function Male() {
    const {
        newProducts,
        currentCategory,
        maxPrice,
        minPrice,
        newBrands,
        newConditions,
        newClothSize,
        newColors
    } = useAppSelector(state => state.filterReducer)
    const { setData, setBrands, setCondition, setClothSise, setColor } = filterSlice.actions
    const dispatch = useAppDispatch()

    const { data: products, isLoading, isSuccess: succesProduct } = postApi.useFetchAllProductQuery(null)
    const { data: allBrands, isSuccess: succesBrands } = postApi.useFetchAllBrandsQuery(null)

    const conditions =
        [
            'Новая с биркой',
            'Новая без бирки',
            'Небольшие дефекты',
            'Надевалась один раз',
            'Надевалась несколько раз'
        ]

    const sizeType = ['XXL', 'XL', 'L', 'M', 'S', 'XS', 'XXS']

    const colors  = ['Синий', 'Зелёный', 'Оранжевый', 'Красный', 'Голубой', 'Чёрный', 'Фиолетовый', 'Серый', 'Белый', 'Коричневый']

    const [currentSort, setSort] = useState("Рекомендации")
    
    useEffect(() => {
        if (!currentCategory) {
            dispatch(setData(products))
        }
        if (!newBrands) {
            dispatch(setBrands(allBrands))
        }
        if (!newConditions) {
            dispatch(setCondition(conditions))
        }
        if (!newClothSize) {
            dispatch(setClothSise(sizeType))
        }
        if (!newColors) {
            dispatch(setColor(colors))
        }
    }, [succesProduct, currentCategory, succesBrands, newBrands, newConditions, newClothSize, newColors])

    const maleProduct = newProducts?.filter((el: any) => {
        return el.mainCategory === "Мужское"
    })

    const filtredPriceProduct = maleProduct?.filter(
        (el: any) => el.price <= maxPrice && el.price >= minPrice
    )

    const filtredBrands = filtredPriceProduct?.filter((el: any) => {
        if (newBrands?.includes(el.brand)) {
            return el
        }
    })

    const filtredConditions = filtredBrands?.filter((el: any) => {
        if (newConditions?.includes(el.condition)) {
            return el
        }
    })

    const filtredClothSize = filtredConditions?.filter((el: any) => {
        if (newClothSize?.includes(el.size)) {
            return el
        }
    })
    
    const filterColor = filtredClothSize?.filter((el:any, i: any) => {
        if(newColors?.includes(el.color)){
            return el
        }
    })

    const sordetProduct = () => {
        switch (currentSort) {
            case "Цена по возрастанию":
                const upData = filterColor?.sort(function (a: any, b: any) {
                    return a.price - b.price
                })
                return upData?.map((el: any) => {
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
                            id={el.id} />
                    )
                })
            case "Цена по убыванию":
                const downData = filterColor?.sort(function (a: any, b: any) {
                    return b.price - a.price
                })
                return downData?.map((el: any) => {
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
                            id={el.id} />
                    )
                })
            default:
                return filterColor?.map((el: any) => {
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
                            id={el.id} />
                    )
                })
        }
    }

    return (
        <ProductArea isLoading={isLoading} data={sordetProduct}>
            <MySelect
                data={["Новые предложения", "Цена по возрастанию", "Цена по убыванию"]}
                onChange={(e) => setSort(e.target.value)}
                defaultValue={"Рекомендации"} />
        </ProductArea>
    )
}