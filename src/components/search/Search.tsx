import React from 'react'
import IconSelector from '../../assets/icons/icons'
import styles from '../../styles/styleComponents/Search.module.scss'

export default function Search() {
    return (
        <div className={styles.search}>
            <div className={styles.search + ' _container'}>
                <div className={styles.search__body}>
                    <IconSelector id='search' className={styles.search__ico} />
                    <input
                        className={styles.search__input}
                        type='text'
                        placeholder='Поиск товара, бренда или продавца...' />
                </div>
            </div>
        </div>
    )
}