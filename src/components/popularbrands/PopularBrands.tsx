import React from 'react'
import { Link } from 'react-router-dom'
import IconSelector from '../../assets/icons/icons'
import { extraApi } from '../../services/ExtraService'
import s from './PopularBrands.module.scss'
import BrandsItem from '../brandsitem/BrandsItem'
import ErrorConnection from '../interface/errorconnection/ErrorConnection'

export default function PopularBrands() {
    const { data: brands, isLoading: brandsIsLoading, isError } = extraApi.useGetAllBrandsQuery({
        page: 1,
        params: 'limit=4'
    }) as any

    const renderBrands = () => {
        if (isError) {
            return <ErrorConnection/>
        } else {
            if (!brandsIsLoading) {
                return (
                    brands.brands.map((el: string) => {
                        return <BrandsItem name={el} key={el} />
                    })
                )
            } else return <IconSelector className={s.popbrands__loader} id='loader' />
        }
    }

    return (
        <section className={s.popbrands}>
            <div className={s.popbrands__body}>
                <div className={s.popbrands__title}>
                    <h1>Популярные бренды</h1>
                    <Link to='/brands'><span>Все бренды</span></Link>
                </div>
                <div className={s.popbrands__content}>
                    {renderBrands()}
                </div>
            </div>
        </section>
    )
}