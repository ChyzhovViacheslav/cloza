import React, { useState, useEffect } from 'react'
import IconSelector from '../../assets/icons/icons'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { filterSlice } from '../../store/reducers/ProductFilter'
import s from '../../styles/styleComponents/Filter.module.scss'
import CollapsableItem from '../interface/collapsable/CollapsableItem'
import IonRangeSlider from 'react-ion-slider'
import MyReactSelect from '../interface/inputs/MyReactSelect'
import { AnyObject } from 'immer/dist/internal'
import { extraApi } from '../../services/ExtraService'
import { useLocation, useNavigate } from 'react-router'

interface IFilter {
    setModalIsActive: (e: boolean) => void
}

export default function Filter({ setModalIsActive }: IFilter) {
    const {
        setSubCategories,
        setPrice,
        setInitialBrands,
        setBrands,
        setCondition,
        setClothSize,
        setColor,
        resetAllFilters
    } = filterSlice.actions

    const { data: categories, isLoading: isLoadingCategories } = extraApi.useGetCategoriesQuery(null)
    const { data: brandsDB, isLoading: isLoadingBrands } = extraApi.useGetAllBrandsQuery({ page: '', params: 'limit=undefined' })
    const {
        newConditions,
        conditions,
        clothSize,
        newClothSize,
        colors,
        price,
        newColors,
        brands,
        newBrands,
        currentCategory
    } = useAppSelector(state => state.filterReducer)

    const dispatch = useAppDispatch()

    const location = useLocation()
    const navigate = useNavigate()
    const [allCategories, setAllCategories] = useState<Object[]>()

    useEffect(() => {
        if (!isLoadingCategories) {
            setAllCategories([...categories[0].top, ...categories[0].bottom, ...categories[0].accessories, ...categories[0].shoes].slice(0, 5))
        }

        if (!isLoadingBrands) {
            dispatch(setInitialBrands(brandsDB.brands))
        }

    }, [isLoadingCategories])

    useEffect(() => {
        setFilter(
            [
                { arr: newColors, filter: 'colors' },
                { arr: newClothSize, filter: 'size' },
                { arr: newConditions, filter: 'condition' },
                { arr: newBrands, filter: 'brands' },
                { arr: currentCategory, filter: 'subcategory' },
                { arr: price, filter: 'price' }
            ]
        )
    }, [newConditions, newClothSize, newColors, isLoadingBrands, newBrands, currentCategory, price])


    const setFilter = (arrs: any) => {
        let newArr = ''

        arrs.forEach((el: any, i: any) => {
            newArr = `${newArr}${el.arr.length > 0 ? `${el.filter}=` : ''}${el.arr.join(',')}${el.arr.length > 0 ? '/' : ''}`
        })

        navigate(`${location.pathname}?${newArr.substring(0, newArr.length - 1)}`)
    }

    const dispatchFilter = (data: any, dispatchFunc: any, eValue: any, eChecked: any, dataLength: number) => {
        if (data.includes(eValue) && eChecked) {
            dispatch(dispatchFunc(data.filter((el: string) => el === eValue)))
        } else if (data.includes(eValue) && !eChecked) {
            dispatch(dispatchFunc(data.filter((el: string) => el !== eValue)))
        } else if (!data.includes(eValue) && data.length < dataLength) {
            dispatch(dispatchFunc([...data, eValue]))
        }
    }

    const renderCategories = () => {
        if (!isLoadingCategories) {
            return (
                allCategories?.map((el: any) => {
                    return (
                        <div
                            className={s.filter__categories}
                            key={el}
                            onClick={() => { dispatch(setSubCategories([el])) }}>
                            <h2>{el}</h2>
                        </div>
                    )
                })
            )
        } else return <IconSelector id='loader' />
    }

    const renderBrands = () => {
        const customData = brands?.map((el: string) => {
            return ({
                value: el, label: el
            })
        })

        return (
            <MyReactSelect
                onChange={(e: any) => {
                    const changedBrands = e.map((el: AnyObject) => {
                        return el.value
                    })
                    dispatch(setBrands(changedBrands))
                }}
                className={s.filter__filter_brands}
                isMulti={true}
                data={customData}
                defaultValue={newBrands.length ? { value: newBrands[0], label: newBrands[0] } : null} />
        )
    }

    const renderCondition = () => {
        return (
            <div className={s.filter__condition_inputs}>
                {conditions?.map((el: string, i: number) => {
                    const renamedValue = () => {
                        switch (el) {
                            case 'novaya_s_birkoy': return 'Новая с биркой'
                            case 'novaya_bez_birki': return 'Новая без бирки'
                            case 'nebolshie_defekti': return 'Небольшие дефекты'
                            case 'nadevalas_odin_raz': return 'Надевалась один раз'
                            case 'nadevalas_neskolko_raz': return 'Надевалась несколько раз'
                            default: return el
                        }
                    }
                    return (
                        <div className={s.filter__condition_label} key={i}>
                            <input onChange={(e) => {
                                dispatchFilter(newConditions, setCondition, e.target.value, e.target.checked, 5)
                            }}
                                type="checkbox"
                                id='condition'
                                checked={location.search.includes(el)}
                                value={el} />
                            <p>{renamedValue()}</p>
                        </div>
                    )
                })}
            </div>
        )
    }

    const renderClothSize = () => {
        return (
            <div className={s.filter__cloth_size_wrapper}>
                {clothSize?.map((el: string, i: number) => {
                    return (
                        <label key={i} className={s.filter__label_size}>
                            <input
                                className={s.filter__input_size}
                                onChange={(e) => {
                                    dispatchFilter(newClothSize, setClothSize, e.target.value, e.target.checked, 7)
                                }}
                                type='checkbox'
                                id='clothSize'
                                checked={newClothSize.includes(el)}
                                value={el}
                            />
                            <span className={s.filter__input_value}>{el}</span>
                        </label>
                    )
                })}
            </div>
        )
    }

    const renderColor = () => {
        const backgroundColors = (el: string) => {
            switch (el) {
                case 'blue': return { backgroundColor: '#337ab6' }
                case 'green': return { backgroundColor: '#5cb85c' }
                case 'orange': return { backgroundColor: '#f0ac4e' }
                case 'red': return { backgroundColor: '#ff0000' }
                case 'lightblue': return { backgroundColor: '#5bc0de' }
                case 'black': return { backgroundColor: '#282a3c' }
                case 'violet': return { backgroundColor: '#800080' }
                case 'gray': return { backgroundColor: '#777777' }
                case 'white': return { backgroundColor: '#ffffff', border: '2px solid #000' }
                case 'brown': return { backgroundColor: '#d9534f' }
            }
        }
        return (
            <div className={s.filter__color_wrapper}>
                {colors?.map((el: any, i: number) => {
                    return (
                        <input
                            key={i}
                            className={s.filter__color_input}
                            onChange={(e) => {
                                dispatchFilter(newColors, setColor, e.target.value, e.target.checked, 10)
                            }}
                            style={backgroundColors(el)}
                            value={el}
                            type='checkbox'
                            checked={newColors.includes(el)}
                            id='colors'
                        />
                    )
                })}
            </div>
        )
    }

    return (
        <div className={s.filter}>
            <div className={s.filter__body}>
                <CollapsableItem isClosed={false} title='Цена' className={s.filter__price} tittleClassName={s.filter__title}>
                    <div className={s.filter__price_line}>
                        <IonRangeSlider
                            skin='square'
                            type='double'
                            min={0}
                            max={200000}
                            postfix={' ₴'}
                            force_edges
                            extra_classes={s.filter__price_style}
                            onFinish={(data: any) => {
                                dispatch(setPrice([`${data.from}-${data.to}`]))
                            }} />
                    </div>
                </CollapsableItem>
                <CollapsableItem isClosed={false} title='Категории' className={s.filter__categories} tittleClassName={s.filter__title}>
                    <div className={s.filter__categories_list}>
                        {renderCategories()}
                        <span
                            className={s.filter__categories_btn}
                            onClick={() => setModalIsActive(true)}>Показать ещё</span>
                    </div>
                </CollapsableItem>
                <CollapsableItem isClosed={false} title='Бренды' className={s.filter__brands} tittleClassName={s.filter__title}>
                    {renderBrands()}
                </CollapsableItem>
                <CollapsableItem isClosed={false} title='Состояние' className={s.filter__condition} tittleClassName={s.filter__title}>
                    {renderCondition()}
                </CollapsableItem>
                <CollapsableItem isClosed={false} title='Размер одежды' className={s.filter__size_clothing} tittleClassName={s.filter__title}>
                    {renderClothSize()}
                </CollapsableItem>
                <CollapsableItem isClosed={false} title='Цвета' className={s.filter__colors} tittleClassName={s.filter__title}>
                    {renderColor()}
                </CollapsableItem>
                <div className={s.filter__reset} onClick={() => {
                    dispatch(resetAllFilters())
                    window.scrollTo(0, 0)
                }}>
                    <span>Сбросить фильтр</span>
                </div>
            </div>
        </div>
    )
}