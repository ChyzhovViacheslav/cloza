import React from 'react'
import Slider from '../../components/interface/slider/Slider';
import NewPoducts from '../../components/newproducts/NewProducts';
import s from '../../styles/styleComponents/Home.module.scss';

export default function Home() {

  return (
    <div className={s.home}>
      <div className={s.home + ' _container'}>
        <div className={s.home__body}>
          <Slider/>
          <NewPoducts/>
        </div>
      </div>
    </div>
  )
}