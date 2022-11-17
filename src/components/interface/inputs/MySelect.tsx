import React from 'react'
import s from './MySelect.module.scss';

type IMySelect = {
    onChange: (e:React.ChangeEvent<HTMLSelectElement>) => void
    className?: string
    defaultValue: string
    data?: any[]
    children?: JSX.Element | JSX.Element[] 
}

export default function MySelect({ onChange, className, defaultValue, data, children }: IMySelect) {
    return (
        <select
            className={`${s.select} ${className}`}
            onChange={onChange}>
            <option value={defaultValue}>{defaultValue}</option>
            {data?.map((el:string, index:number) => {
                const renamedValue = () => {
                    switch (el) {
                        case 'female': return 'Женское'
                        case 'male': return 'Мужское'
                        case 'unisex': return 'Унисекс'
                        case 'novaya_s_birkoy': return 'Новая с биркой'
                        case 'novaya_bez_birki': return 'Новая без бирки'
                        case 'nebolshie_defekti': return 'Небольшие дефекты'
                        case 'nadevalas_odin_raz': return 'Надевалась один раз'
                        case 'nadevalas_neskolko_raz': return 'Надевалась несколько раз'
                        case 'top': return 'Верх'
                        case 'bottom': return 'Низ'
                        case 'shoes': return 'Обувь'
                        case 'accessories': return 'Аксессуары'                         
                        default: return el
                    }
                }
                return(
                    <option key={index} value={el}>{renamedValue()}</option>
                )
            })}
            {children}
        </select>
    )
}