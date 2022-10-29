import React, { useState, useEffect } from 'react'
import IconSelector from '../../assets/icons/icons'
import s from '../../styles/styleComponents/Pagination.module.scss'

interface IPagination {
    data: any
    setCurrentElement: any
}

export default function Pagination({ data, setCurrentElement }: IPagination) {
    const [allPages, setAllPages] = useState<number>()
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        setAllPages(Math.ceil((data?.length) / 16))
    }, [data?.length])

    const renderPages = () => {
        const indexes = []
        for (let index = 1; index <= allPages; index++) {
            indexes.push(index)
        }

        return (
            <div className={s.pagination__body}>
                <IconSelector id='west' className={s.pagination__ico} />
                {indexes.map((el, i) => {
                    return <h2
                        key={i}
                        className={currentPage === (i + 1) ? `${s.pagination__page} ${s.pagination__current_page}` : s.pagination__page}
                        style={currentPage === (i + 1) ? { pointerEvents: 'none' } : { pointerEvents: 'all' }}
                        onClick={() => {
                            setCurrentPage(i + 1)
                            
                                setCurrentElement([((i + 1) * 16) - 15, (i + 1) * 16])
                                // setCurrentElement([(((currentPage + 1) * 16) - 16), (currentPage + 1) * 16])
                            
                        }}>
                        {el}
                    </h2>
                })}
                <IconSelector id='east' className={s.pagination__ico} />
            </div>
        )
    }
    return (
        <div className={s.pagination}>
            {renderPages()}
        </div>
    )
}