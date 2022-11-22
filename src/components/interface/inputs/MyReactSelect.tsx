import React from 'react'
import Select from 'react-select'

type IMyReactSelect = {
    className: string
    isMulti: boolean
    data: any
    onChange: (e:Event) => void
    defaultValue: any
}

const MyReactSelect = ({ isMulti, className, data, onChange, defaultValue }: IMyReactSelect) => {
    const customStyles = {
        control: () => ({
            display: 'flex',
            padding: '0px',
            minHeight: '40px',
            width: '100%',
            border: '1px solid var(--gray-light)',
            borderRadius: '8px'
        }),
        option: () => ({
            fontFamily: 'PTRoot',
            padding: '8px 16px'
        }),
        valueContainer: () => ({
            display: 'flex',
            padding: '8px 16px',
            alignItems: 'center',
            flex: '1 1 auto',
            width: '100%',
            rowGap: '8px',
            columnGap: '8px',
            flexWrap: 'wrap' as 'wrap'
        }),
        singleValue: () => ({
            fontFamily: 'PTRoot',
            fontSize: '16px'
        }),
        input: () => ({
            padding: '0px',
            margin: '0px',
            width: '50%'
        }),
        indicatorSeparator: () => ({
            display: 'none'
        }),
        dropdownIndicator: () => ({
            color: '#9095a9',
            marginRight: '12px'
        }),
        multiValueLabel: () => ({
            fontFamily: 'PTRoot',
            color: '#ffffff'
        }),
        multiValue: () => ({
            padding: '8px 12px',
            borderRadius: '8px',
            backgroundColor: 'var(--main-color)',
            display: 'flex',
            alignItems: 'center'
        }),
        multiValueRemove: () => ({
            color: '#fff',
            marginLeft: '7px',
            display: 'flex',
            alignItems: 'center'
        })
    }
    return (
        <Select
            placeholder=''
            isMulti={isMulti}
            className={className}
            styles={customStyles}
            onChange={onChange}
            options={data && data}
            defaultValue={defaultValue} />
    )
}

export default MyReactSelect