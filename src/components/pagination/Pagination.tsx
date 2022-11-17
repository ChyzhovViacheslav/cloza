import React, { useState, useEffect } from 'react'
import IconSelector from '../../assets/icons/icons'
import s from '../../styles/styleComponents/Pagination.module.scss'

interface IPagination {
    currentPage: number,
    totalPages: number,
    setCurrentPage: any
}

export default function Pagination({ currentPage, totalPages, setCurrentPage }: IPagination) {

    useEffect(() => {

    }, [currentPage, totalPages])

    const renderPages = () => {
        const indexes = []
        for (let index = 1; index <= totalPages; index++) {
            indexes.push(index)
        }

        return (
            <div className={s.pagination__body}>
                <IconSelector onClick={() => {
                    if (currentPage !== 1) {
                        setCurrentPage(currentPage - 1)
                        window.scrollTo(0, 0)
                    }
                }} id='west' className={s.pagination__ico} />
                {indexes.map((el, i) => {
                    return <h2
                        key={i}
                        className={currentPage === (i + 1) ? `${s.pagination__page} ${s.pagination__current_page}` : s.pagination__page}
                        style={currentPage === (i + 1) ? { pointerEvents: 'none' } : { pointerEvents: 'all' }}
                        onClick={() => {
                            setCurrentPage(i + 1)
                            window.scrollTo(0, 0)
                        }}>
                        {el}
                    </h2>
                })}
                <IconSelector onClick={() => {
                    if (totalPages !== currentPage) {
                        setCurrentPage(currentPage + 1)
                        window.scrollTo(0, 0)
                    }
                }} id='east' className={s.pagination__ico} />
            </div>
        )
    }
    return (
        <div className={s.pagination}>
            {renderPages()}
        </div>
    )
}