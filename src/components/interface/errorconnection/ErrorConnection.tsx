import React from 'react'
import IconSelector from '../../../assets/icons/icons'
import s from './ErrorConnection.module.scss'

export default function ErrorConnection() {
  return (
    <div className={s.error}>
        <IconSelector id='warn'/>
        <h1>Ошибка сети</h1>
    </div>
  )
}