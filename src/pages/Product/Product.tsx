import React from 'react'
import IconSelector from '../../assets/icons/icons';
import s from '../../styles/styleComponents/Product.module.scss';
import Button from '../../components/interface/button/Button';
import Line from '../../components/interface/line/Line';
import { postApi } from '../../services/PostService';
import { useParams } from 'react-router';

export default function Product() {
    const { id } = useParams()
    const { data: item, isLoading } = postApi.useFetchProductQuery(id)

    return (
        <div className={s.product}>
            <div className={s.product__body}>
                {isLoading ? <IconSelector className={s.product__loader} id='loader'/> :
                    <div className={s.product__content}>
                        <div className={s.product__imgs}>

                        </div>
                        <div className={s.product__info}>
                            <div className={s.product__title}>
                                <IconSelector className={s.product__verified} id='verified-user' />
                                <h1>{item.name}</h1>
                                <IconSelector id='heart' />
                            </div>
                            <div className={s.product__other}>

                            </div>
                            <div className={s.product__price}><h5>27 000₴</h5></div>
                            <div className={s.product__description}>
                                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod eaque, sed perspiciatis ipsam magni corrupti officia veniam! Labore, quae consequatur?</p>
                            </div>
                            <div className={s.product__props}>
                                <div className={s.product__size}>
                                    <h2>Размер:</h2><span>М</span>
                                </div>
                                <div className={s.product__color}>
                                    <h2>Цвет:</h2><span>Черный</span><div className={s.product__color_round}></div>
                                </div>
                                <div className={s.product__condition}>
                                    <h2>Состояние:</h2><span>Новая без бирки</span>
                                </div>
                                <div className={s.product__brand}>
                                    <h2>Брэнд: </h2><span>Versace</span>
                                </div>
                            </div>
                            <div className={s.product__amount}>
                                <div className={s.product__amount_change}>
                                    <IconSelector className={s.product__amount_ico} id='plus' />
                                    <span>1</span>
                                    <IconSelector className={s.product__amount_ico} id='minus' />
                                </div>
                                <Button className={s.product__buy_btn} text='Купить' />
                            </div>
                            <div className={s.product__safe_transaction}>
                                <h2>Безопасная сделка</h2>
                                <IconSelector
                                    className={s.product__safe_ico} id='verified-user' />
                            </div>
                            <Line className={s.product__line} />
                            <div className={s.product__saler}>
                                <div className={s.product__saler_img}>

                                </div>
                                <div className={s.product__saler_inf}>
                                    <div className={s.product__saler_title}>
                                        <h2>Константин Паладий</h2>
                                        <span><h2>на cloza с 11.09.22</h2></span>
                                    </div>
                                    <div className={s.product__saler_rate}>
                                        <div className={s.product__stars}></div>
                                        <h2>261 голосов</h2>
                                    </div>
                                    <div className={s.product__amount_products}>
                                        <h2>8 товаров в наличии</h2>
                                    </div>
                                </div>
                            </div>
                            <button className={s.product__send}>
                                <span>Написать</span>
                                <IconSelector className={s.product__send_ico} id='email' />
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}