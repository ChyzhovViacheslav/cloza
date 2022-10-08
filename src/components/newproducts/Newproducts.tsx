import React from 'react'
import {useRef} from 'react'
import { postApi } from '../../services/PostService'
import s from '../../styles/styleComponents/NewProducts.module.scss'
type INewProducts = {}

export default function NewPoducts({ }: INewProducts) {
    const { data: posts } = postApi.useFetchAllSexQuery(null)
    const categories = posts?.map((post) => {
        const nameOfType = () => {
            switch (post.type) {
                case 'male': return <span>Мужской</span>
                case 'female': return <span>Женский</span>
                case 'unisex': return <span>Унисекс</span>
                default: return <span>{post.type}</span>
            }
        }
        return (
            <button key={post.id} className={s.newproducts__nav_btn}>
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