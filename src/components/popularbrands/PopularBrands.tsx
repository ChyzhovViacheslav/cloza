import React from 'react'
import { Link } from 'react-router-dom'
import IconSelector from '../../assets/icons/icons'
import { extraApi } from '../../services/ExtraService'
import s from '../../styles/styleComponents/PopularBrands.module.scss'
import BrandsItem from '../brandsitem/BrandsItem'
type Props = {}

export default function PopularBrands({ }: Props) {
    const { data: brands, isLoading: brandsIsLoading } = extraApi.useGetAllBrandsQuery({
        page: 1,
        params: 'limit=4'
    }) as any

    const renderBrands = () => {
        if (!brandsIsLoading) {
            return (
                brands.brands.map((el: string, i: number) => {
                    return <BrandsItem name={el} key={i} />
                })
            )
        } else return <IconSelector className={s.popbrands__loader} id='loader' />
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