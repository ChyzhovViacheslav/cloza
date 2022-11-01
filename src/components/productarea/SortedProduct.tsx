import { render } from '@testing-library/react'
import React from 'react'
import ClothesCard from '../clothesitem/ClothesCard'

export default function sortedProducts(currentSort:string, data:any) {
    switch (currentSort) {
        case "Цена по возрастанию":
            const upData = data?.sort(function (a: any, b: any) {
                return a.price - b.price
            })

            return upData?.map((el: any) => {
                return (
                    <ClothesCard
                        key={el.id}
                        saler={el.saler}
                        name={el.name}
                        condition={el.condition}
                        mainCategory={el.mainCategory}
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
            const downData = data?.sort(function (a: any, b: any) {
                return b.price - a.price
            })
            return downData?.map((el: any) => {
                return (
                    <ClothesCard
                        key={el.id}
                        saler={el.saler}
                        name={el.name}
                        condition={el.condition}
                        mainCategory={el.mainCategory}
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
            return data?.map((el: any) => {
                return (
                    <ClothesCard
                        key={el.id}
                        saler={el.saler}
                        name={el.name}
                        condition={el.condition}
                        mainCategory={el.mainCategory}
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