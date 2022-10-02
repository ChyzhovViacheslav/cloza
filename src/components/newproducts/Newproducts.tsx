import React from 'react'
import s from '../../styles/styleComponents/NewProducts.module.scss'
type INewProducts = {}

export default function NewPoducts({ }: INewProducts) {
    return (
        <div className={s.newproducts}>
            <div className={s.newproducts__body}>
                <nav className={s.newproducts__nav}>
                    <div className={s.newproducts__nav_btn_wrapper}>
                        <button className={`${s.newproducts__nav_btn} ${s.newproducts__nav_active}`}>Мужское<div className={`${s.newproducts__nav_btn_active} ${s.newproducts__nav_active_line}`}></div></button>
                        <button className={s.newproducts__nav_btn}>Женское<div className={s.newproducts__nav_btn_active}></div></button>
                        <button className={s.newproducts__nav_btn}>Унисекс<div className={s.newproducts__nav_btn_active}></div></button>
                    </div>
                    <div className={s.newproducts__nav_line}></div>
                </nav>
                <div className={s.newproducts__sort}>
                    
                </div>
            </div>
        </div>
    )
}