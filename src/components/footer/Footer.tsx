import React from 'react'
import { Link } from 'react-router-dom';
import IconSelector from '../../assets/icons/icons';
import { useAppDispatch } from '../../hooks/redux';
import useAuth from '../../hooks/userAuth';
import s from './Footer.module.scss';
import Line from '../interface/line/Line';
import { smModalSlice } from '../../store/reducers/SmModalSlice';

interface IFooter {
    setFavModalIsActive: any
}

export default function Footer({ setFavModalIsActive }: IFooter) {
    const { isAuth } = useAuth()
    const dispatch = useAppDispatch()

    const { changeToFav } = smModalSlice.actions
    return (
        <footer className={s.footer}>
            <div className={`${s.footer} _container`}>
                <div className={s.footer__body}>
                    <div className={s.footer__categories}>
                        <div className={s.footer__item}>
                            <div className={s.footer__item_title}>
                                <h3>Категории</h3>
                            </div>
                            <div className={s.footer__text}>
                                <Link to='/male'><span>Мужское</span></Link>
                                <Link to='/female'><span>Женское</span></Link>
                                <Link to='/unisex'><span>Унисекс</span></Link>
                            </div>
                        </div>
                        <div className={s.footer__item}>
                            <div className={s.footer__item_title}>
                                <h3>О нас</h3>
                            </div>
                            <div className={s.footer__text}>
                                <Link to='/about'><span>О компани</span></Link>
                                <Link to='/contacts'><span>Контакты</span></Link>
                                <Link to='/faq'><span>FAQ</span></Link>
                            </div>
                        </div>
                        <div className={s.footer__item}>
                            <div className={s.footer__item_title}>
                                <h3>Мой аккаунт</h3>
                            </div>
                            <div className={s.footer__text}>
                                <Link onClick={(e) => {
                                    e.preventDefault()
                                    if (!isAuth) {
                                        dispatch(changeToFav())
                                        setFavModalIsActive(true)
                                    }
                                }} to='/profile'><span>Список желаний</span></Link>
                                <Link onClick={(e) => {
                                    e.preventDefault()
                                    if (!isAuth) {
                                        dispatch(changeToFav())
                                        setFavModalIsActive(true)
                                    }
                                }} to='/profile'><span>Корзина</span></Link>
                            </div>
                        </div>
                        <div className={s.footer__item}>
                            <div className={s.footer__item_title}>
                                <h3>Сервис</h3>
                            </div>
                            <div className={s.footer__text}>
                                <Link to='/security'><span>Безопасная сделка</span></Link>
                                <Link to='/rules'><span>Правила оказания услуг</span></Link>
                            </div>
                        </div>
                        <div className={s.footer__contacts}>
                            <h3>+38 (099) 70-131-73</h3>
                            <Link to='#' onClick={(e) => {
                                window.location.href = 'mailto:cloza@hotmaile.com'
                                e.preventDefault()
                            }}>
                                <p>cloza@hotmale.com</p>
                            </Link>
                            <IconSelector onClick={() => { console.log('inst') }} id='inst' className={s.footer__inst_ico} />
                        </div>
                    </div>
                    <Line style={{ marginTop: '32px' }} />
                    <div className={s.footer__terms}>
                        <div className={s.footer__terms_field}>
                            <div style={{ flex: '1 1 auto' }}>
                                <Link to='/terms'><span>Пользовательское соглашение</span></Link> и <Link to='/privacy'><span>политика конфиденциальности</span></Link>
                            </div>
                            <p>©CLOZA 2022. Все права защищены</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}