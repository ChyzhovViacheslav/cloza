import React from 'react'
import ClothesCard from '../clothesitem/ClothesCard'

export default function productCards(data: any) {
    return data?.map((el: any) => {
        return (
            <ClothesCard
                key={el._id}
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
                discount={el.discount}
                price={el.price}
                amount={el.amount}
                trade={el.trade}
                id={el._id} 
                mainPhoto={el.mainPhoto}
                additionalsPhotos={el.additionalsPhotos}/>
        )
    })
}