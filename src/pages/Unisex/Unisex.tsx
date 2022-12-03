import React, { useEffect } from 'react'
import ProductArea from '../../components/productarea/ProductArea'
import { useAppSelector } from '../../hooks/redux'

export default function Unisex() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <ProductArea />
  )
}