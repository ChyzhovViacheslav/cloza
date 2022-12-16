import React from 'react'
import IconSelector from '../../assets/icons/icons';
import Line from '../../components/interface/line/Line';
import s from './Security.module.scss';

export default function Security() {
    return (
        <div className={s.sec}>
            <div className={s.sec__body}>
                <div className={s.sec__title}>
                    <h1>Покупайте и продавайте товары без риска</h1>
                </div>
                <div className={s.sec__steps}>
                    <p style={{ marginTop: '48px' }}>
                        Безопасная сделка гарантирует <span style={{ fontWeight: '500' }}>100% предоплату</span>, которая хранится на счёте гаранта PayPal, пока продавец не отправит оплаченный заказ, а покупатель не получит товар.
                    </p>
                    <div className={s.sec__ico_items}>
                        <div className={s.sec__item}>
                            <div className={s.sec__body_ico}>
                                <IconSelector id='sec-1' className={s.sec__ico} />
                            </div>
                            <div className={s.sec__ico_title}>
                                <h4>Защита сделок на
                                    любую сумму</h4>
                            </div>
                        </div>
                        <div className={s.sec__item}>
                            <div className={s.sec__body_ico}>
                                <IconSelector id='sec-2' className={s.sec__ico} />
                            </div>
                            <div className={s.sec__ico_title}>
                                <h4>Возврат денег при невыполнении заказа</h4>
                            </div>
                        </div>
                        <div className={s.sec__item}>
                            <div className={s.sec__body_ico}>
                                <IconSelector id='sec-3' className={s.sec__ico} />
                            </div>
                            <div className={s.sec__ico_title}>
                                <h4>Исключение
                                    мошенничества</h4>
                            </div>
                        </div>
                        <div className={s.sec__item}>
                            <div className={s.sec__body_ico}>
                                <IconSelector id='sec-4' className={s.sec__ico} />
                            </div>
                            <div className={s.sec__ico_title}>
                                <h4>Оперативное разрешение споров</h4>
                            </div>
                        </div>
                    </div>
                    <div className={s.sec__item_text}>
                        <p>
                            Безопасность обработки Интернет-платежей гарантирует ООО «PayPal». Процессинговый центр PayPal защищает и обрабатывает данные Вашей банковской карты по стандарту безопасности PCI DSS 3.2. Передача информации в платежный шлюз происходит с применением технологии шифрования SSL. Дальнейшая передача информации происходит по закрытым банковским сетям, имеющим наивысший уровень надежности. PayPal не передает данные Вашей карты нам и иным третьим лицам. Для дополнительной аутентификации держателя карты используется протокол 3D Secure.
                        </p>
                    </div>
                </div>
                <Line style={{ marginTop: '64px' }} />
                <div className={s.sec__benefits}>
                    <div className={s.sec__benefits_title}>
                        <h1>Кому это выгодно?</h1>
                    </div>
                    <div className={s.sec__benefits_items}>
                        <div className={s.sec__benefits_item}>
                            <div className={s.sec__benefits_item_title}>
                                <IconSelector id='okay' />
                                <h4>Покупателям</h4>
                            </div>
                            <div className={s.sec__benefits_item_text}>
                                <p>
                                    Если продавец нарушает условия сделки, гарант-сервис PayPal возвращает средства покупателю на карту, с которой была проведена оплата.
                                </p>
                            </div>
                        </div>
                        <div className={s.sec__benefits_item}>
                            <div className={s.sec__benefits_item_title}>
                                <IconSelector id='okay' />
                                <h4>Продавцам</h4>
                            </div>
                            <div className={s.sec__benefits_item_text}>
                                <p>
                                    Продавец гарантированно получит денежные средства, при своевременной отправке необходимого заказа.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Line style={{ marginTop: '64px' }} />
                <div className={s.sec__how}>
                    <div className={s.sec__how_title}>
                        <h1>Как это работает?</h1>
                    </div>
                    <div className={s.sec__how_items}>
                        <div className={s.sec__how_item}>
                            <div className={s.sec__how_item_sircle}>
                                <span>1</span>
                            </div>
                            <div className={s.sec__how_item_text}><p>Покупатель выбирает подходящий товар</p></div>
                        </div>
                        <Line className={s.sec__how_line}/>
                        <div className={s.sec__how_item}>
                            <div className={s.sec__how_item_sircle}>
                                <span>2</span>
                            </div>
                            <div className={s.sec__how_item_text}><p>Покупатель выбирает способ доставки, который предоставляет продавец, оплачивает товар через безопасную сделку (оплачивает 7% комиссии), деньги поступают на безопасный счёт PayPal.</p></div>
                        </div>
                        <Line className={s.sec__how_line}/>
                        <div className={s.sec__how_item}>
                            <div className={s.sec__how_item_sircle}>
                                <span>3</span>
                            </div>
                            <div className={s.sec__how_item_text}><p>Продавец получает заказ, если товар в наличии, продавец отправляет его покупателю. Если товара нет в наличии, продавец отменяет заказ, деньги возвращаются покупателю (за вычетом 3.9% комиссии)</p></div>
                        </div>
                        <Line className={s.sec__how_line}/>
                        <div className={s.sec__how_item}>
                            <div className={s.sec__how_item_sircle}>
                                <span>4</span>
                            </div>
                            <div className={s.sec__how_item_text}><p>Покупатель принимает и проверяет товар, нажимает кнопку подтверждения получения заказа в личном кабинете</p></div>
                        </div>
                        <Line className={s.sec__how_line}/>
                        <div className={s.sec__how_item}>
                            <div className={s.sec__how_item_sircle}>
                                <span>5</span>
                            </div>
                            <div className={s.sec__how_item_text}><p>PayPal переводит деньги продавцу (за вычетом 7% комиссии)</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}