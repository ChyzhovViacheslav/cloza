import React from 'react'
import { Link } from 'react-router-dom'
import IconSelector from '../../assets/icons/icons'
import Button from '../../components/interface/Button'
import s from '../../styles/styleComponents/Contacts.module.scss'

type Props = {}

export default function Contacts({ }: Props) {
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
                                <p>Адрес: 301657, г. Новомосковск, ул. Школьная, дом 17.</p>
                                <p>Адрес для корреспонденции: г. Москва, ул. Домодедовская, дом 20 к2</p>
                            </div>
                            <h5>Telegram, Whatsapp, E-mail</h5>
                            <div className={s.contacts__text_field}>
                                <p>+38(099)70 131 73</p>
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
                            <form id='contactsForm' className={s.contacts__form}>
                                <label>
                                    <p>Имя</p>
                                    <input className={s.contacts__input} type='text' placeholder='Имя'/>
                                </label>
                                <label>
                                    <p>E-mail</p>
                                    <input className={s.contacts__input} type='text' placeholder='E-mail'/>
                                </label>
                                <label style={{height: 'auto'}}>
                                    <p>Сообщение</p>
                                    <textarea className={`${s.contacts__input} ${s.contacts__input_area}`} placeholder='Сообщение'/>
                                </label>
                                <Button 
                                    className={s.contacts__form_btn} 
                                    text='Отправить' 
                                    type='submit'/>
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}