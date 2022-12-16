import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import IconSelector from '../../assets/icons/icons'
import { useAppDispatch } from '../../hooks/redux'
import IProduct from '../../models/IProduct'
import IUser from '../../models/IUser'
import { authUser } from '../../services/AuthUser'
import { extraApi } from '../../services/ExtraService'
import { productApi } from '../../services/ProductService'
import { filterSlice } from '../../store/reducers/ProductFilter'
import s from './Search.module.scss'

export default function Search() {
    const [currentValue, setCurrentValue] = useState('')
    const [selectIsActive, setSelectIsActive] = useState(true)
    const { setBrands } = filterSlice.actions

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    useEffect(() => {
      if(currentValue.length){
        setSelectIsActive(true)
      }
    }, [currentValue.length])
    

    const { data: brands, isLoading: brandsIsLoading } = extraApi.useGetAllBrandsQuery({
        page: 1,
        params: `limit=9999`
    })

    const { data: products, isLoading: productsIsLoading } = productApi.useGetAllProductsQuery(({
        page: 1,
        limit: '999'
    }))

    const { data: users, isLoading: userIsLoading } = authUser.useFetchAllUsersQuery({
        page: 1,
        limit: 999
    })

    const renderItems = () => {
        const filterBrands = brands?.brands.filter((el: string) => {
            return el.toLowerCase().includes(currentValue.toLowerCase())
        })
        const filterProducts = products?.products.filter((el: IProduct) => {
            return el.name.toLowerCase().includes(currentValue.toLowerCase())
        })
        const filterUsers = users?.users.filter((el: IUser) => {
            return el.username.toLowerCase().includes(currentValue.toLowerCase())
        })
        if (currentValue.length >= 3) {
            if (brandsIsLoading && productsIsLoading && userIsLoading) {
                return <IconSelector className={s.search__loader} id='loader' />
            } else {
                return (
                    <>
                        {filterBrands?.map((el: string) => {
                            return (
                                <div
                                    key={el}
                                    className={s.search__item}
                                    onClick={() => {
                                        dispatch(setBrands([el]))
                                        navigate(`/male?brands=${el}`)
                                        setCurrentValue('')
                                    }}>
                                    <span>{el}</span>
                                    <h3>Бренд</h3>
                                </div>
                            )
                        })}
                        {filterProducts?.map((el: IProduct) => {
                            return (
                                <div
                                    key={el._id}
                                    className={s.search__item}
                                    onClick={() => {
                                        navigate(`/product/${el._id}`)
                                        setCurrentValue('')
                                    }}>
                                    <span>{el.name}</span>
                                    <h3>Товар</h3>
                                </div>
                            )
                        })}
                        {filterUsers?.map((el: any) => {
                            return (
                                <div
                                    key={el._id}
                                    className={s.search__item}
                                    onClick={() => {
                                        navigate(`/saler/${el.username}`)
                                    }}>
                                    <span>{el.username}</span>
                                    <h3>Продавец</h3>
                                </div>
                            )
                        })}
                    </>
                )
            }
        }
    }

    return (
        <div className={s.search}>
            <div className={s.search + ' _container'}>
                <div className={s.search__body}>
                    <IconSelector id='search' className={s.search__ico} />
                    <input
                        onChange={(e) => setCurrentValue(e.target.value)}
                        onMouseEnter={() => {
                            if(currentValue){
                                setSelectIsActive(true)
                            }
                        }}
                        value={currentValue}
                        className={s.search__input}
                        type='text'
                        placeholder='Поиск товара, бренда или продавца...' />
                    <div
                        className={selectIsActive ? `${s.search__options} ${s.active}` : s.search__options}
                        onMouseLeave={() => {
                            setSelectIsActive(false)
                        }}>
                        {renderItems()}
                    </div>
                </div>
            </div>
        </div>
    )
}