import React, { useEffect } from 'react'
import IconSelector from '../../assets/icons/icons'
import s from '../../styles/styleComponents/Pagination.module.scss'

interface IPagination {
    currentPage: number,
    totalPages: number,
    setCurrentPage: any,
    className?: string
}

export default function Pagination({ currentPage, totalPages, setCurrentPage, className }: IPagination) {
    const spreading = 3

    useEffect(() => {

    }, [currentPage, totalPages])

    const renderPages = () => {
        const indexes = []
        for (let index = 1; index <= totalPages; index++) {
            indexes.push(index)
        }

        return (
            <div
                className={s.pagination__body}
                style={totalPages === 1 ? { display: 'none' } : { display: 'flex' }}>
                <IconSelector onClick={() => {
                    if (currentPage !== 1) {
                        setCurrentPage(currentPage - 1)
                        window.scrollTo(0, 0)
                    }
                }} id='west' className={s.pagination__ico} />
                {indexes.length <= 9 ?
                    indexes.map((el, i) => {
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
                    })
                    :
                    <div className={s.pagination__row}>
                        {currentPage >= 6 ?
                            <>
                                <h2
                                    className={currentPage === 1 ? `${s.pagination__page} ${s.pagination__current_page}` : s.pagination__page}
                                    style={currentPage === 1 ? { pointerEvents: 'none' } : { pointerEvents: 'all' }}
                                    onClick={() => {
                                        setCurrentPage(1)
                                        window.scrollTo(0, 0)
                                    }}>1</h2>
                                <h2>...</h2>
                                {indexes.map((el, i) => {
                                    if ((currentPage - spreading) <= (i + 1) && (currentPage + spreading) >= (i + 1)) {
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
                                    } else return null
                                })}
                                {currentPage <= 28 ? <>
                                    <h2>...</h2>
                                    <h2
                                        className={currentPage === totalPages ? `${s.pagination__page} ${s.pagination__current_page}` : s.pagination__page}
                                        style={currentPage === totalPages ? { pointerEvents: 'none' } : { pointerEvents: 'all' }}
                                        onClick={() => {
                                            setCurrentPage(totalPages)
                                            window.scrollTo(0, 0)
                                        }}>{totalPages}</h2></> :
                                    <></>}
                            </>
                            :
                            <>
                                {indexes.map((el, i) => {
                                    if (currentPage <= 9) {
                                        if (i >= 9) {
                                            return null
                                        } else {
                                            return <h2
                                                key={i}
                                                className={currentPage === (el) ? `${s.pagination__page} ${s.pagination__current_page}` : s.pagination__page}
                                                style={currentPage === (el) ? { pointerEvents: 'none' } : { pointerEvents: 'all' }}
                                                onClick={() => {
                                                    setCurrentPage(el)
                                                    window.scrollTo(0, 0)
                                                }}>
                                                {el}
                                            </h2>
                                        }
                                    }
                                })}
                                <h2>...</h2>
                                <h2
                                    className={currentPage === totalPages ? `${s.pagination__page} ${s.pagination__current_page}` : s.pagination__page}
                                    style={currentPage === totalPages ? { pointerEvents: 'none' } : { pointerEvents: 'all' }}
                                    onClick={() => {
                                        setCurrentPage(totalPages)
                                        window.scrollTo(0, 0)
                                    }}>{totalPages}</h2>
                            </>
                        }
                    </div>
                }
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
        <div className={`${s.pagination} ${className}`}>
            {renderPages()}
        </div>
    )
}