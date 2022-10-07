import React from 'react'
import { postApi } from '../../services/PostService'
import s from '../../styles/styleComponents/NewProducts.module.scss'
type INewProducts = {}

export default function NewPoducts({ }: INewProducts) {
    const { data: posts } = postApi.useFetchAllSexQuery('')

    const categories = posts?.map((post:string) => {
        const nameOfType = () => {
            switch (post) {
                case 'male': return 'Мужской';
                case 'female': return 'Женский'
                case 'unisex': return 'Унисекс'
                default: return post
            }
        }
        return (
            <button key={post} className={s.newproducts__nav_btn}>
                {nameOfType()}
                <div className={s.newproducts__nav_btn_active}></div>
            </button>
        )
    })


    return (
        <div className={s.newproducts}>
            <div className={s.newproducts__body}>
                <nav className={s.newproducts__nav}>
                    <div className={s.newproducts__nav_btn_wrapper}>
                        {/* <button className={`${s.newproducts__nav_btn} ${s.newproducts__nav_active}`}>Мужское<div className={`${s.newproducts__nav_btn_active} ${s.newproducts__nav_active_line}`}></div></button>
                        <button className={s.newproducts__nav_btn}>Женское<div className={s.newproducts__nav_btn_active}></div></button>
                        <button className={s.newproducts__nav_btn}>Унисекс<div className={s.newproducts__nav_btn_active}></div></button> */}
                        {categories}
                    </div>
                    <div className={s.newproducts__nav_line}></div>
                </nav>
                <div className={s.newproducts__sort}>

                </div>
            </div>
        </div>
    )
}