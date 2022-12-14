import React, {useEffect} from 'react'
import ProductArea from '../../components/productarea/ProductArea'

export default function Sale() {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    return (
        <ProductArea/>
    )
}