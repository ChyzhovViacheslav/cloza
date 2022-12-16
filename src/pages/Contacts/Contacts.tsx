import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import IconSelector from '../../assets/icons/icons'
import Button from '../../components/interface/button/Button'
import SuccessModal from '../../components/interface/successmodal/SuccessModal'
import WarningModal from '../../components/interface/warningmodal/WarningModal'
import s from './Contacts.module.scss'

export default function Contacts() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')
    const [successModal, setSuccessModal] = useState(false)
    const [warnModal, setWarnModal] = useState(false)

    return (
        <div className={s.contacts}>
            <div className={s.contacts__body}>
                <div className={s.contacts__title}>
                    <h1>Контакты</h1>
                    <div className={s.contacts__title_sub}>
                        <p>Qui officia deserunt mollit anim id est labrum. Duis aute irret dolor derit into voludptate velit esse.</p>
                    </div>
                </div>
                <div className={s.contacts__wrapper}>
                    <div className={s.contacts__column}>
                        <div className={s.contacts__adress}>
                            <h5>Контактные данные</h5>
                            <div className={s.contacts__text_field}>
                                <p>ИП Чижов Вячеслав Евгениевич,</p>
                                <p>ИНН 711613495293, ОГРНИП 320715400016540</p>
                                <p>Адрес: 74900, г. Новая Каховка, ул. Довженко, дом 12.</p>
                                <p>Адрес для корреспонденции: г. Херсон, ул. Шевченко, дом 20 кв.3</p>
                            </div>
                            <h5>Telegram, Whatsapp, E-mail</h5>
                            <div className={s.contacts__text_field}>
                                <p>+38(099)70 131 76</p>
                                <Link to='#' onClick={(e) => {
                                    window.location.href = 'mailto:Duffs@hotmail.com'
                                    e.preventDefault()
                                }}>
                                    <p style={{ fontWeight: '500', color: 'var(--main-color)' }}> Duffs@hotmail.com</p>
                                </Link>
                            </div>
                            <h5>Работа службы поддержки</h5>
                            <div className={s.contacts__text_field}>
                                <p>7 дней в неделю</p>
                                <p>с 10:00 до 21:00</p>
                            </div>
                            <h5>Социальные сети</h5>
                            <div className={s.contacts__text_field}>
                                <Link to='#' onClick={(e) => {
                                    console.log('inst-big');
                                }}>
                                    <IconSelector id='inst-big' />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={s.contacts__column}>
                        <div className={s.contacts__send_form}>
                            <h5>Контактные данные</h5>
                            <form method='POST' action='./mail.php' id='contactsForm' className={s.contacts__form}>
                                <label>
                                    <p>Имя</p>
                                    <input
                                        name='name'
                                        value={name}
                                        className={s.contacts__input}
                                        onChange={e => setName(e.target.value)}
                                        type='text'
                                        placeholder='Имя' />
                                </label>
                                <label>
                                    <p>E-mail</p>
                                    <input
                                        className={s.contacts__input}
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        name='email'
                                        type='text'
                                        placeholder='E-mail' />
                                </label>
                                <label style={{ height: 'auto' }}>
                                    <p>Сообщение</p>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        name='message'
                                        className={`${s.contacts__input} ${s.contacts__input_area}`}
                                        placeholder='Сообщение' />
                                </label>
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        if (!email || !message || !name) {
                                            setWarnModal(true)
                                        } else setSuccessModal(true)
                                    }}
                                    className={s.contacts__form_btn}
                                    text='Отправить'
                                    type='submit' />
                            </form>
                        </div>
                    </div>
                </div>
            </div >
            <SuccessModal
                modalIsActive={successModal}
                setModalIsActive={setSuccessModal}
                successText='Сообщение отправлено' />
            <WarningModal
                modalIsActive={warnModal}
                setModalIsActive={setWarnModal}
                warnText='Заполните все поля' />
        </div >
    )
}