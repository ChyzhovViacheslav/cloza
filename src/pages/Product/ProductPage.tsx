import React, { useState, useEffect } from 'react'
import IconSelector from '../../assets/icons/icons';
import s from '../../styles/styleComponents/ProductPage.module.scss';
import Button from '../../components/interface/button/Button';
import Line from '../../components/interface/line/Line';
import { useParams } from 'react-router';
import { productApi } from '../../services/ProductService';

export default function Product() {
    const { id } = useParams()
    const { data: item, isLoading } = productApi.useGetProductQuery(id)
    const [initialAmount, setInitialAmount] = useState(1)
    const [currentTab, setCurrentTab] = useState('Описание')
    const descriptionTabs = ['Описание', 'Доставка']

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
            case 'blue': return '#337ab6'
            case 'green': return '#5cb85c'
            case 'orange': return '#f0ac4e'
            case 'red': return '#ff0000'
            case 'lightblue': return '#5bc0de'
            case 'black': return '##282a3c'
            case 'violet': return '#800080'
            case 'gray': return '#777777'
            case 'white': return '#ffffff'
            case 'brown': return '#d9534f'
        }
    }

    const renamedColor = () => {
        switch (item.color) {
            case 'blue': return 'Синий'
            case 'green': return 'Зелёный'
            case 'orange': return 'Оранжевый'
            case 'red': return 'Красный'
            case 'lightblue': return 'Голубой'
            case 'black': return 'Чёрный'
            case 'violet': return 'Фиолетовый'
            case 'gray': return 'Серый'
            case 'white': return 'Белый'
            case 'brown': return 'Коричневый'
        }
    }

    const renamedCondition = () => {
        switch (item.condition) {
            case 'novaya_s_birkoy': return 'Новая с биркой'
            case 'novaya_bez_birki': return 'Новая без бирки'
            case 'nebolshie_defekti': return 'Небольшие дефекты'
            case 'nadevalas_odin_raz': return 'Надевалась один раз'
            case 'nadevalas_neskolko_raz': return 'Надевалась несколько раз'
            default: return item.condition
        }
    }


    const renderTabs = descriptionTabs.map((el: string, i: number) => {
        return (
            <div
                className={currentTab === el ? `${s.product__nav_btn} ${s.active}` : s.product__nav_btn}
                key={i}
                onClick={() => setCurrentTab(el)}>
                <span>{el}</span>
            </div>
        )
    })

    return (
        <div className={s.product}>
            <div className={s.product__body}>
                {isLoading && !item ? <IconSelector className={s.product__loader} id='loader' /> :
                    <>
                        <div className={s.product__content}>
                            <div className={s.product__imgs}>
                                <div className={s.product__other_img}>
                                    {item.additionalsPhotos.map((el: string, i: number) => {
                                        return <img key={i} src={el} alt='additionalImg' />
                                    })}
                                </div>
                                <div className={s.product__current_img}>
                                    <img
                                        src={item.mainPhoto}
                                        alt='img' />
                                </div>
                            </div>
                            <div className={s.product__info}>
                                <div className={s.product__title}>
                                    <IconSelector className={s.product__verified} id='verified-user' />
                                    <h1>{item.name}</h1>
                                    <IconSelector className={s.product__favorite} id='heart' />
                                </div>
                                <div className={s.product__other}>

                                </div>
                                <div className={s.product__price}><h5>{item.price}</h5><IconSelector id='uah' /></div>
                                <div className={s.product__props}>
                                    <div className={s.product__size}>
                                        <h2>Размер:</h2><span>{item.size}</span>
                                    </div>
                                    <div className={s.product__color}>
                                        <h2>Цвет:</h2>
                                        <span>{renamedColor()}</span>
                                        <div
                                            className={s.product__color_round}
                                            style={{ backgroundColor: renderColor(item.color) }}></div>
                                    </div>
                                    <div className={s.product__condition}>
                                        <h2>Состояние:</h2>
                                        <span>{renamedCondition()}</span>
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
                        <div className={s.product__description}>
                            <div className={s.product__nav}>
                                <div className={s.product__nav_body}>
                                    {renderTabs}
                                    <Line style={{ position: 'absolute', bottom: '0', zIndex: '1' }} />
                                </div>
                            </div>
                            {currentTab === 'Описание' ?
                                <div className={s.product__description_text}>
                                    <p>{item.description}</p>
                                </div>
                                :
                                <div className={s.product__delivery}>
                                    Доставка
                                </div>}
                        </div>
                        
                    </>
                }
            </div>
        </div>
    )
}