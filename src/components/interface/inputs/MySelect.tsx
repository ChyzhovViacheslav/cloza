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
                return(
                    <option key={index} value={el}>{el}</option>
                )
            })}
            {children}
        </select>
    )
}