import React, { useState } from 'react'
import IconSelector from '../../assets/icons/icons'
import DeliveryInfo from '../../components/deliveryinfo/deliveryinfo'
import Button from '../../components/interface/button/Button'
import Line from '../../components/interface/line/Line'
import Modal from '../../components/interface/modal/Modal'
import SuccessModal from '../../components/interface/successmodal/SuccessModal'
import WarningModal from '../../components/interface/warningmodal/WarningModal'
import useAuth from '../../hooks/userAuth'
import ICartList from '../../models/ICartList'
import { productApi } from '../../services/ProductService'
import s from '../../styles/styleComponents/Ordering.module.scss'

export default function Ordering() {
    const { cartlist } = useAuth()

    const [modalIsActive, setModalIsActive] = useState(false)

    const fancyCartlist = () => {
        let id = ``
        cartlist.forEach((el: ICartList) => {
            id = id + `&id=${el.id}`
        })
        return id
    }

    const { data: products } = productApi.useGetAllProductsQuery({
        page: 1,
        limit: 999,
        params: fancyCartlist()
    })

    const [currentOffset, setCurrentOffset] = useState(0)

    const currentAmount = (id: string) => {
        if (!cartlist.length) {
            return 0
        } else {
            const amount: ICartList[] = cartlist.filter((el: ICartList) => el.id === id)
            return amount[0].amount
        }
    }

    const [deliveryType, setDeliveryType] = useState('meeting')

    const currentPrice = () => {
        let price = 0
        products?.products.forEach((el: any) => {
            if (el.discount) {
                price = price + (el.discount * currentAmount(el._id)) + (deliveryType === 'meeting' ? 0 : 150) + 50
            } else price = price + (el.price * currentAmount(el._id)) + (deliveryType === 'meeting' ? 0 : 150) + 50
        })
        return price
    }

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('') as any
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [index, setIndex] = useState('') as any

    const [cardNumber, setCardNumber] = useState<number>()
    const [cardDate, setCardDate] = useState('')
    const [cardCvv, setCardCvv] = useState<number>()
    const [cardClient, setCardClient] = useState('')


    const [successModalIsActive, setSuccessModalIsActive] = useState(false)
    const [warnModalIsActive, setWarnModalIsActive] = useState(false)

    const rigthClickHandle = () => {
        if (currentOffset === ((cartlist.length * -558) + 558)) {
            setCurrentOffset(0)
        } else {
            setCurrentOffset(currentOffset - 558)
        }
    }

    const leftClickHandle = () => {
        if (currentOffset === 0) {
            setCurrentOffset((cartlist.length * -558) + 558)
        } else {
            setCurrentOffset(currentOffset + 558)
        }
    }

    const renderProducts = () => {
        const backgroundColors = (size: string) => {
            switch (size) {
                case 'blue': return { backgroundColor: '#337ab6', marginLeft: '8px' }
                case 'green': return { backgroundColor: '#5cb85c', marginLeft: '8px' }
                case 'orange': return { backgroundColor: '#f0ac4e', marginLeft: '8px' }
                case 'red': return { backgroundColor: '#ff0000', marginLeft: '8px' }
                case 'lightblue': return { backgroundColor: '#5bc0de', marginLeft: '8px' }
                case 'black': return { backgroundColor: '#282a3c', marginLeft: '8px' }
                case 'violet': return { backgroundColor: '#800080', marginLeft: '8px' }
                case 'gray': return { backgroundColor: '#777777', marginLeft: '8px' }
                case 'white': return { backgroundColor: '#ffffff', border: '2px solid #000', marginLeft: '8px' }
                case 'brown': return { backgroundColor: '#d9534f', marginLeft: '8px' }
            }
        }
        const renamedCondition = (condition: string) => {
            switch (condition) {
                case 'novaya_s_birkoy': return 'Новая с биркой'
                case 'novaya_bez_birki': return 'Новая без бирки'
                case 'nebolshie_defekti': return 'Небольшие дефекты'
                case 'nadevalas_odin_raz': return 'Надевалась один раз'
                case 'nadevalas_neskolko_raz': return 'Надевалась несколько раз'
                default: return condition
            }
        }
        if (!cartlist.length) {
            return <div className={s.ordering__empty_cartlist}>
                <h5>Ваша корзина пуста</h5>
            </div>
        } else {
            return (
                products?.products.map((el: any, i: number) => {
                    return (
                        <div key={i} className={s.ordering__checkout_item}>
                            <div className={s.ordering__checkout_photo}>
                                <img src={el.mainPhoto} alt='cardPhoto' />
                            </div>
                            <h2 className={s.ordering__checkout_product_title}>{el.name}</h2>
                            <div className={s.ordering__checkout_product_info}>
                                <h2>Размер:<span>{el.size}</span></h2>
                                <h2>Цвет:<div style={backgroundColors(el.color)}></div></h2>
                                <h2>Состояние:<span>{renamedCondition(el.condition)}</span></h2>
                                <h2>Бренд:<span>{el.brand}</span></h2>
                                <p>{el.description}</p>
                                <h2>Цена:<span>{el.discount ? el.discount : el.price}</span><IconSelector id='uah' /></h2>
                                <h2>Кол-во:<span>{currentAmount(el._id)}</span></h2>
                                <h2>Доставка:<span>{deliveryType === 'meeting' ? 0 : 150}</span><IconSelector id='uah' /></h2>
                                <h2>Комиссия:<span>50</span><IconSelector id='uah' /></h2>
                            </div>
                        </div>
                    )
                })
            )
        }
    }

    return (
        <div className={s.ordering}>
            <div className={s.ordering__body}>
                <DeliveryInfo
                    name={name}
                    email={email}
                    phone={phone}
                    city={city}
                    index={index}
                    address={address}
                    setAddress={setAddress}
                    setCity={setCity}
                    setEmail={setEmail}
                    setIndex={setIndex}
                    setName={setName}
                    setPhone={setPhone}
                    isTemplate={false}
                    setDeliveryType={setDeliveryType}
                    setModalIsActive={setModalIsActive}
                    setSuccessModalIsActive={setSuccessModalIsActive}
                    setOrderingWarnModal={setWarnModalIsActive}
                />
                <div className={s.ordering__checkout}>
                    <div className={s.ordering__checkout_title}>
                        <h5>Товары</h5>
                        <div className={s.ordering__checkout_btns}>
                            <div onClick={() => leftClickHandle()}><IconSelector id='arrowLeft' /></div>
                            <div onClick={() => rigthClickHandle()}><IconSelector id='arrowRight' /></div>
                        </div>
                    </div>
                    <div className={s.ordering__checkout_slider}>
                        <div className={s.ordering__checkout_window}>
                            <div
                                className={s.ordering__checkout_container}
                                style={{ transition: 'transform 0.3s ease-in-out', transform: `translateX(${currentOffset}px)` }}>
                                {renderProducts()}
                            </div>
                        </div>
                    </div>
                    <Line style={{ margin: '32px 0px' }} />
                    <h4>Общая стоимость:<span>{currentPrice()}</span><IconSelector id='uah' /></h4>
                </div>
            </div >
            <Modal closeModal={() => setModalIsActive(false)} active={modalIsActive}>
                <div className={s.modal}>
                    <div className={s.modal__title}>
                        <h5>Платёжные данные</h5>
                        <p>Пожалуйста, укажите платежные данные для списания средств</p>
                    </div>
                    <form className={s.modal__form}>
                        <div className={s.modal__row}>
                            <label>
                                <span>Номер карты</span>
                                <input
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(parseInt(e.target.value))}
                                    placeholder='Номер карты'
                                    type="number" />
                            </label>
                            <label>
                                <span>ММ/ГГ</span>
                                <input
                                    value={cardDate}
                                    onChange={(e) => setCardDate(e.target.value)}
                                    placeholder='ММ/ГГ'
                                    type='text' />
                            </label>
                        </div>
                        <div className={s.modal__row}>
                            <label>
                                <span>Имя владельца</span>
                                <input
                                    value={cardClient}
                                    onChange={(e) => setCardClient(e.target.value)}
                                    type='text'
                                    placeholder='Имя владельца' />
                            </label>
                            <label>
                                <span>CVC</span>
                                <input
                                    value={cardCvv}
                                    onChange={(e) => setCardCvv(parseInt(e.target.value))}
                                    placeholder='CVC'
                                    type="number" />
                            </label>
                        </div>
                        <label className={s.modal__ticket}>
                            <input type='checkbox' />
                            <span>Получить квитанцию об оплате на e-mail</span>
                        </label>
                        <Button
                            className={s.modal__btn}
                            text='Оплатить'
                            onClick={() => {
                                if (!cardClient || !cardCvv || !cardDate || cardNumber) {
                                    setWarnModalIsActive(true)
                                } else {
                                    setModalIsActive(true)

                                }
                            }} />
                    </form>
                </div>
            </Modal>
            <SuccessModal
                successText='Заказ сформирован'
                setModalIsActive={setSuccessModalIsActive}
                modalIsActive={successModalIsActive} />
            <WarningModal
                warnText='Заполните все поля'
                modalIsActive={warnModalIsActive}
                setModalIsActive={setWarnModalIsActive} />
        </div >
    )
}