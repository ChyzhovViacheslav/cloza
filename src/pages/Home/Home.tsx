import React from 'react'
import Slider from '../../components/interface/slider/Slider';
import NewPoducts from '../../components/newproducts/Newproducts';
import styles from '../../styles/styleComponents/Home.module.scss';


export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.home + ' _container'}>
        <div className={styles.home__body}>
          <Slider/>
          <NewPoducts/>
        </div>
      </div>
    </div>
  )
}