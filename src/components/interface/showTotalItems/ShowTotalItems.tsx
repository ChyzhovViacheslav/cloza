import React from 'react'

interface IShowTotalItems {
    currentPage: number,
    currentItems: number,
    totalItems: number,
    spreading: number
}

export default function ShowTotalItems({currentItems, currentPage, totalItems, spreading}: IShowTotalItems) {
  return (
    <span>Показано {((spreading * currentPage) - spreading) + (currentItems < 1 ? 0 : 1)} - {((spreading * currentPage) - (spreading - currentItems))}  из {totalItems}</span>
  )
}