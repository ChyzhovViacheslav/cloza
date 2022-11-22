import React from 'react'
import IconSelector from '../../assets/icons/icons';
import Line from '../../components/interface/line/Line';
import Slider from '../../components/interface/slider/Slider';
import NewPoducts from '../../components/newproducts/NewProducts';
import PopularBrands from '../../components/popularbrands/PopularBrands';
import TopSalers from '../../components/topsalers/TopSalers';
import s from '../../styles/styleComponents/Home.module.scss';

export default function Home() {

  const renderChoose = () => {
    return (
      <section className={s.home__choose}>
        <div className={s.home__choose_body}>
          <div className={s.home__choose_title}>
            <h1>Почему выбирают нас?</h1>
          </div>
          <div className={s.home__choose_content}>
            <div className={s.home__choose_item}>
              <div className={s.home__choose_item_body}>
                <div className={s.home__choose_item_img}>
                  <IconSelector id='shoping'/>
                </div>
                <div className={s.home__choose_item_title}>
                  <h2>Маркетплейс</h2>
                </div>
                <div className={s.home__choose_item_subtitle}>
                  <span>CLOZA - маркетплейс ресейла брендовой одежды</span>
                </div>
              </div>
            </div>
            <div className={s.home__choose_item}>
              <div className={s.home__choose_item_body}>
                <div className={s.home__choose_item_img}>
                  <IconSelector id='original'/>
                </div>
                <div className={s.home__choose_item_title}>
                  <h2>Оригинал</h2>
                </div>
                <div className={s.home__choose_item_subtitle}>
                  <span>Мы следим за оригинальностью продаваемых вещей</span>
                </div>
              </div>
            </div>
            <div className={s.home__choose_item}>
              <div className={s.home__choose_item_body}>
                <div className={s.home__choose_item_img}>
                  <IconSelector id='settings'/>
                </div>
                <div className={s.home__choose_item_title}>
                  <h2>Подбор</h2>
                </div>
                <div className={s.home__choose_item_subtitle}>
                  <span>Удобный подбор одежды по всем параметрам</span>
                </div>
              </div>
            </div>
            <div className={s.home__choose_item}>
              <div className={s.home__choose_item_body}>
                <div className={s.home__choose_item_img}>
                  <IconSelector id='money'/>
                </div>
                <div className={s.home__choose_item_title}>
                  <h2>Безопасная сделка</h2>
                </div>
                <div className={s.home__choose_item_subtitle}>
                  <span>Безопасность платежей для покупателей и продавцов</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className={s.home}>
      <div className={s.home + ' _container'}>
        <div className={s.home__body}>
          <Slider/>
          <NewPoducts/>
          <Line style={{marginTop: '64px'}}/>
          <PopularBrands/>
          <Line style={{marginTop: '64px'}}/>
          <TopSalers/>
          <Line style={{marginTop: '64px'}}/>
          {renderChoose()}
        </div>
      </div>
    </div>
  )
}