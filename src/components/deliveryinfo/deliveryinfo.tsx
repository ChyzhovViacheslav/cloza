import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import IconSelector from '../../assets/icons/icons'
import s from '../../styles/styleComponents/DeliveryInfo.module.scss'
import Button from '../interface/button/Button'
import Line from '../interface/line/Line'
import { authUser } from '../../services/AuthUser'
import useAuth from '../../hooks/userAuth'
import { useAppDispatch } from '../../hooks/redux'
import { userSlice } from '../../store/reducers/UserSlice'
import IDeliveryInfo from '../../models/IDeliveryInfo'

interface IDeliveryInfoCompnent {
    isTemplate: boolean,
    name: string,
    phone: any,
    email: string,
    city: string,
    address: string,
    index: any,
    setName: (value: string) => void,
    setPhone: (value: any) => void,
    setEmail: (value: string) => void,
    setCity: (valie: string) => void,
    setAddress: any,
    setIndex: (value: any) => void,
    setDeliveryType?: any
    setModalIsActive?: (value: boolean) => void
    setSuccessModalIsActive: (value: boolean) => void
    templateWarnIsActive?: boolean
    setTemplateWarnIsActive?: (value: boolean) => void
    setOrderingWarnModal?: (value: boolean) => void
    createOrderHandler?: any
}

export default function DeliveryInfo({
    isTemplate, name, phone, email, city, address, index,
    setAddress, setCity, setEmail, setIndex, setName, setPhone, setDeliveryType, setModalIsActive,
    setSuccessModalIsActive, setTemplateWarnIsActive, setOrderingWarnModal, createOrderHandler }: IDeliveryInfoCompnent) {

    const { delivery_info, _id } = useAuth() as any
    const { changeDeliveryInfoList } = userSlice.actions
    const dispatch = useAppDispatch()

    const [changeUserInfo] = authUser.useChangeUserInfoMutation()

    const [paymentType, setPaymentType] = useState('')
    const [comment, setComment] = useState('')
    const [currentOffset, setCurrentOffset] = useState(0)

    const templateRadioRef = useRef([])

    const uncheckRadio = () => {
        templateRadioRef.current.forEach((el) => {
            el.checked = false
        })
    }

    const setDeliveryInfo = () => {
        const newDeliveryInfoList = [...delivery_info, {
            id: Date.now(),
            name: name,
            phone: phone,
            email: email,
            city: city,
            address: address,
            index: index
        }]

        dispatch(changeDeliveryInfoList(newDeliveryInfoList))

        changeUserInfo({
            id: _id,
            body: {
                delivery_info: newDeliveryInfoList
            }
        })
    }

    const rigthClickHandle = () => {
        if (currentOffset === (((delivery_info.length - 1) * -291) + 291) || delivery_info.length === 1) {
            setCurrentOffset(0)
        } else {
            setCurrentOffset(currentOffset - 291)
        }
    }

    const leftClickHandle = () => {
        if (delivery_info.length === 1) {
            setCurrentOffset(0)
        } else if (currentOffset === 0) {
            setCurrentOffset(((delivery_info.length - 1) * -291) + 291)
        } else {
            setCurrentOffset(currentOffset + 291)
        }
    }

    const changeCurrentTemplate = (el: IDeliveryInfo) => {
        setAddress(el.address)
        setCity(el.city)
        setEmail(el.email)
        setIndex(el.index)
        setName(el.name)
        setPhone(el.phone)
    }

    const renderTemplates = () => {
        return (
            delivery_info.map((el: IDeliveryInfo, i: number) => {
                return (
                    <label key={el.id} className={s.delivery_info__templates_item}>
                        <div style={{ display: 'flex', marginBottom: '16px', flex: '1 0 auto' }}>
                            <input ref={el => templateRadioRef.current[i] = el} onClick={() => changeCurrentTemplate(el)} type='radio' name='template' />
                            <h2>{el.city}, {el.address}, {el.index}</h2>
                        </div>
                        <span>{el.phone}</span>
                        <span>{el.email}</span>
                    </label>
                )
            })
        )
    }

    return (
        <div className={s.delivery_info}>
            <form className={s.delivery_info__info}>
                <div className={s.delivery_info__title}>
                    <h5>Данные для доставки</h5>
                    {!isTemplate ? <div className={s.delivery_info__title_btns}>
                        <div onClick={() => leftClickHandle()}><IconSelector id='arrowLeft' /></div>
                        <div onClick={() => rigthClickHandle()}><IconSelector id='arrowRight' /></div>
                    </div> : null}
                </div>
                {!isTemplate ? <div className={s.delivery_info__templates}>
                    <div className={s.delivery_info__templates_window}>
                        <div
                            className={s.delivery_info__templates_container}
                            style={{ transition: 'transform 0.3s ease-in-out', transform: `translateX(${currentOffset}px)` }}>
                            {renderTemplates()}
                        </div>
                    </div>
                </div> : null}
                <label className={s.delivery_info__name}>
                    <span>ФИО</span>
                    <input
                        placeholder='ФИО'
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                            uncheckRadio()
                        }} />
                </label>
                <div className={s.delivery_info__phone_email}>
                    <label className={s.delivery_info__phone}>
                        <span>Номер телефона</span>
                        <input
                            placeholder='Номер телефона'
                            value={phone}
                            type='number'
                            onChange={(e) => {
                                setPhone(e.target.value)
                                uncheckRadio()
                            }} />
                    </label>
                    <label className={s.delivery_info__email}>
                        <span>E-mail</span>
                        <input
                            placeholder='E-mail'
                            type='email'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                uncheckRadio()
                            }} />
                    </label>
                </div>
                <label className={s.delivery_info__city}>
                    <span>Город</span>
                    <input
                        placeholder='Город'
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value)
                            uncheckRadio()
                        }} />
                </label>
                <label className={s.delivery_info__address}>
                    <span>Адрес</span>
                    <input
                        placeholder='Улица, дом, квартира'
                        value={address}
                        onChange={(e) => {
                            setAddress(e.target.value)
                            uncheckRadio()
                        }} />
                </label>
                <label className={s.delivery_info__index}>
                    <span>Индекс</span>
                    <input
                        placeholder='Индекс'
                        value={index}
                        type='number'
                        onChange={(e) => {
                            setIndex(e.target.value)
                            uncheckRadio()
                        }} />
                </label>
                {isTemplate ?
                    <Button
                        className={s.delivery_info__set_template}
                        text='Сохранить шаблон'
                        onClick={(e) => {
                            e.preventDefault()
                            if (!phone || !email || !name || !address || !index || !city) {
                                setTemplateWarnIsActive(true)
                            } else {
                                setDeliveryInfo()
                                setSuccessModalIsActive(true)
                            }
                        }} />
                    :
                    <>
                        <div className={s.delivery_info__delivery_method}>
                            <h5>Способ доставки</h5>
                            <label>
                                <input
                                    onChange={(e) => setDeliveryType(e.target.value)}
                                    type="radio"
                                    name='delivery'
                                    value={'post'} />
                                <p>Почта</p>
                                <span>150 грн.</span>
                            </label>
                            <label>
                                <input
                                    onChange={(e) => setDeliveryType(e.target.value)}
                                    type="radio"
                                    name='delivery'
                                    value={'meeting'} />
                                <p>Личная встреча</p>
                                <span>Бесплатно</span>
                            </label>
                        </div>
                        <div className={s.delivery_info__payment_method}>
                            <h5>Метод оплаты</h5>
                            <label>
                                <input
                                    onChange={(e) => setPaymentType(e.target.value)}
                                    type="radio"
                                    name='payment'
                                    value={'receipt'} />
                                <p>Оплата при получении</p>
                            </label>
                            <label>
                                <input
                                    onChange={(e) => setPaymentType(e.target.value)}
                                    type="radio"
                                    name='payment'
                                    value={'card'} />
                                <p>Банковская карта <span>(Безопасная сделка)</span></p>
                                <IconSelector className={s.delivery_info__verified} id='verified-user' />
                            </label>
                            <div className={s.delivery_info__cards}>
                                <IconSelector id='visa' />
                                <IconSelector id='mastercard' />
                            </div>
                            <div className={s.delivery_info__verified_text}>
                                <p>Безопасная сделка – сервис защиты покупателя и продавца в интернете. Безопасная сделка гарантирует 100% предоплату, которая хранится на счёте гаранта Safecrow, пока продавец не выполнит все свои обязательства, а покупатель не получит товар.</p>
                            </div>
                        </div>
                        <Line style={{ margin: '32px 0px' }} />
                        <div className={s.delivery_info__notation}>
                            <span>Примечание к заказу</span>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)} />
                        </div>
                        <Line style={{ margin: '32px 0px' }} />
                        <div className={s.delivery_info__checkboxes}>
                            <div>
                                <input type='checkbox' value={'Я согласен с правилами сервиса'} />
                                <p>Я согласен с <Link to='/rules'><span>правилами сервиса</span></Link></p>
                            </div>
                            <div>
                                <input type='checkbox' value={'Я согласен с правилами безопасной сделки'} />
                                <p>Я согласен с <Link to='/security'><span>правилами безопасной сделки</span></Link></p>
                            </div>
                        </div>
                        <Button
                            className={s.delivery_info__set_order}
                            text='Оформить заказ'
                            onClick={(e) => {
                                e.preventDefault()
                                if (!phone || !email || !name || !city || !index || !address || !paymentType) {
                                    setOrderingWarnModal(true)
                                } else {
                                    if (paymentType === 'card') {
                                        setModalIsActive(true)
                                    } else {
                                        setSuccessModalIsActive(true)
                                        createOrderHandler()
                                    }
                                }
                            }} />
                    </>}
            </form>
        </div>
    )
}