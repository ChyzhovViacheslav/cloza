import React from 'react'
import ClothesCard from '../../components/clothesitem/ClothesCard'
import ClothesType from '../../components/clothestype/ClothesType'
import { postApi } from '../../services/PostService'

export default function Male() {
    
    // const { data: cards, isLoading } = postApi.useFetchAllItemQuery(null)
    // const cardlist = cards?.map((el) => {
        
    //     if(el.type === "female"){
    //         return (
    //             <ClothesCard key={el.id} />
    //         )
    //     }
    // })
    return (
        <ClothesType>
            {/* {isLoading ? <div><h1>ХУЙ</h1></div> : cardlist} */}
        </ClothesType>
    )
}