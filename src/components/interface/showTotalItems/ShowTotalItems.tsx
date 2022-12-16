import React from 'react'

interface IShowTotalItems {
  currentPage: number,
  currentItems: number,
  totalItems: number,
  spreading: number
  isLoading: boolean
}

export default function ShowTotalItems({ currentItems, currentPage, totalItems, spreading, isLoading }: IShowTotalItems) {
  if(isLoading){
    return <span>Загрузка...</span>
  } else {
    return (
      <span>Показано {((spreading * currentPage) - spreading) + (currentItems < 1 ? 0 : 1)} - {((spreading * currentPage) - (spreading - currentItems))}  из {totalItems}</span>
    )
  }
}