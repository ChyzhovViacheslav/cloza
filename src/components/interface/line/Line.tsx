import React from 'react'
import s from './Line.module.scss'

type ILine = {
    className?: string;
    style?:object;
}

export default function Line({className, style}: ILine) {
  return (
    <div className={`${s.line} ${className}`} style={style}></div>
  )
}