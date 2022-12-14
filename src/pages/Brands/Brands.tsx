import React, { useState } from 'react'
import IconSelector from '../../assets/icons/icons'
import BrandsItem from '../../components/brandsitem/BrandsItem'
import ShowTotalItems from '../../components/interface/showTotalItems/ShowTotalItems'
import LocalSearch from '../../components/localsearch/LocalSearch'
import Pagination from '../../components/pagination/Pagination'
import { extraApi } from '../../services/ExtraService'
import s from '../../styles/styleComponents/Brands.module.scss'

export default function Brands() {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('')

    const {data: brands, isLoading: brandsIsLoading} = extraApi.useGetAllBrandsQuery(
        {  
            page: currentPage,
            params: `search=${searchTerm}`
        })
    
    const renderBrands = () => {
        if(!brandsIsLoading){
            return (
                brands.brands.map((el:string, i: number) => {
                    return <BrandsItem name={el} key={i}/>
                })
            )
        } else return <IconSelector className={s.brands__loader} id='loader'/>
    }
    
    return (
    <div className={s.brands}>
        <div className={s.brands__body}>
            <LocalSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <div className={s.brands__show}>
                <ShowTotalItems currentPage={currentPage} currentItems={brands?.brands.length} totalItems={brands?.totalBrands} spreading={12}/>
            </div>
            <div className={s.brands__content}>
                {renderBrands()}
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={brands?.totalPages}/>
        </div>
    </div>
  )
}