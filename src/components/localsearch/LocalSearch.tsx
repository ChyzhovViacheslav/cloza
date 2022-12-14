import React from 'react'
import IconSelector from '../../assets/icons/icons'
import s from '../../styles/styleComponents/LocalSearch.module.scss'

interface ILocalSearch {
    searchTerm: string,
    setSearchTerm: (value: string) => void
}

export default function LocalSearch({ searchTerm, setSearchTerm }: ILocalSearch) {
    return (
        <div className={s.search}>
            <IconSelector id='search' />
            <input
                value={searchTerm}
                placeholder='Найти'
                onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
    )
}