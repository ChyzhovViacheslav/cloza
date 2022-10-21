import React, { useState, useEffect } from 'react'
import IconSelector from '../../assets/icons/icons';
import s from '../../styles/styleComponents/Product.module.scss';
import Button from '../../components/interface/button/Button';
import Line from '../../components/interface/line/Line';
import { postApi } from '../../services/PostService';
import { useParams } from 'react-router';
import placeholder from '../../assets/images/hdplaceholder.jpg'

export default function Product() {
    const { id } = useParams()
    const { data: item, isLoading } = postApi.useFetchProductQuery(id)
    const [initialAmount, setInitialAmount] = useState(1)

    const incAmount = () => {
        if (initialAmount === item.amount) {

        } else setInitialAmount(initialAmount + 1)
    }

    const decAmount = () => {
        if (initialAmount === 1) {

        } else setInitialAmount(initialAmount - 1)
    }

    const renderColor = (color: string) => {
        switch (color) {
            case 'Синий': return '#337ab6'
            case 'Зелёный': return '#5cb85c'
            case 'Оранжевый': return '#f0ac4e'
            case 'Красный': return '#ff0000'
            case 'Голубой': return '#5bc0de'
            case 'Чёрный': return '##282a3c'
            case 'Фиолетовый': return '#800080'
            case 'Серый': return '#777777'
            case 'Белый': return '#ffffff'
            case 'Коричневый': return '#d9534f'
        }
    }

    return (
        <div className={s.product}>
            <div className={s.product__body}>
                {isLoading ? <IconSelector className={s.product__loader} id='loader' /> :
                    <div className={s.product__content}>
                        <div className={s.product__imgs}>
                            <div className={s.product__other_img}>
                                <img src={placeholder} alt="img" />
                                <img src={placeholder} alt="img" />
                                <img src={placeholder} alt="img" />
                                <img src={placeholder} alt="img" />
                                <img src={placeholder} alt="img" />
                            </div>
                            <div className={s.product__current_img}>
                                <img
                                    src={placeholder}
                                    alt='img' />
                            </div>
                        </div>
                        <div className={s.product__info}>
                            <div className={s.product__title}>
                                <IconSelector className={s.product__verified} id='verified-user' />
                                <h1>{item.name}</h1>
                                <IconSelector id='heart' />
                            </div>
                            <div className={s.product__other}>

                            </div>
                            <div className={s.product__price}><h5>{item.price}</h5><IconSelector id='uah' /></div>
                            <div className={s.product__description}>
                                <p>{item.description}</p>
                            </div>
                            <div className={s.product__props}>
                                <div className={s.product__size}>
                                    <h2>Размер:</h2><span>{item.size}</span>
                                </div>
                                <div className={s.product__color}>
                                    <h2>Цвет:</h2>
                                    <span>{item.color}</span>
                                    <div
                                        className={s.product__color_round}
                                        style={{ backgroundColor: renderColor(item.color) }}></div>
                                </div>
                                <div className={s.product__condition}>
                                    <h2>Состояние:</h2>
                                    <span>{item.condition}</span>
                                </div>
                                <div className={s.product__brand}>
                                    <h2>Брэнд: </h2><span>{item.brand}</span>
                                </div>
                            </div>
                            <div className={s.product__amount}>
                                <div className={s.product__amount_change}>
                                    <IconSelector
                                        className={s.product__amount_ico}
                                        id='plus'
                                        onClick={incAmount} />
                                    <span>{initialAmount}</span>
                                    <IconSelector
                                        className={s.product__amount_ico}
                                        id='minus'
                                        onClick={decAmount} />
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