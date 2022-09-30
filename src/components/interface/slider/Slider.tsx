import React from 'react'
import Button from '../Button'
import Carousel from './carousel/Carousel'
import styles from './Slider.module.scss'
import { Link } from 'react-router-dom'

const Item = () => {
  return(
    <div className={styles.item}>
      <h1>Быть на стиле -<br/> значит быть первым</h1>
      <p>-20% летняя распродажа</p>
      <Link to=''><span className={styles.item__text}>Условия проведения акции</span></Link>
      <Button id='southEast' className={styles.item__btn} text='Подробнее'/>
    </div>
  )
}

export default function Slider() {
  return (
    <Carousel>
        <div className={`${styles.slider__item} ${styles.item_1}`}><Item/></div>
        <div className={`${styles.slider__item} ${styles.item_2}`}><Item/></div>
        <div className={`${styles.slider__item} ${styles.item_3}`}><Item/></div>
        <div className={`${styles.slider__item} ${styles.item_4}`}><Item/></div>
    </Carousel>
  )
}