import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import IconSelector from '../../assets/icons/icons'
import Button from '../../components/interface/button/Button'
import s from '../../styles/styleComponents/Contacts.module.scss'

type Props = {}

export default function Contacts({ }: Props) {
    const [email, setEmail] = useState('')
    const [emailDirty, setEmailDirty] = useState(false)
    const [name, setName] = useState('')
    const [nameDirty, setNameDirty] = useState(false)
    const [message, setMessage] = useState('')
    const [messageDirty, setMessageDirty] = useState(false)

    const blurHandle = (e: any) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break;
            case 'message':
                setMessageDirty(true)
                break;
            case 'name':
                setNameDirty(true)
                break;
            default:
                break;
        }
    }

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
                                <p>Адрес: 74900, г. Новая Каховка, ул. Гагарина, дом 10.</p>
                                <p>Адрес для корреспонденции: г. Херсон, ул. Шевченко, дом 20 кв.3</p>
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
                            <form method='POST' action='./mail.php' id='contactsForm' className={s.contacts__form}>
                                <label>
                                    <p>Имя</p>
                                    <input onBlur={e => blurHandle(e)} style={nameDirty ? {border: '1px solid red'} : {border: 'none'}} name='name' className={s.contacts__input} type='text' placeholder='Имя' />
                                </label>
                                <label>
                                    <p>E-mail</p>
                                    <input onBlur={e => blurHandle(e)} name='email' className={s.contacts__input} type='text' placeholder='E-mail' />
                                </label>
                                <label style={{ height: 'auto' }}>
                                    <p>Сообщение</p>
                                    <textarea onBlur={e => blurHandle(e)} name='message' className={`${s.contacts__input} ${s.contacts__input_area}`} placeholder='Сообщение' />
                                </label>
                                <Button
                                    className={s.contacts__form_btn}
                                    text='Отправить'
                                    type='submit' />
                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}