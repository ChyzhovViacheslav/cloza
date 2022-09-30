import React from 'react'
import Carousel from './carousel/Carousel'
import styles from './Slider.module.scss'


export default function Slider() {
  return (
    <Carousel>
        <div className={`${styles.slider__item} ${styles.item_1}`}>ITEM 1</div>
        <div className={`${styles.slider__item} ${styles.item_2}`}>ITEM 2</div>
        <div className={`${styles.slider__item} ${styles.item_3}`}>ITEM 3</div>
        <div className={`${styles.slider__item} ${styles.item_4}`}>ITEM 4</div>
    </Carousel>
  )
}