import React from 'react'
import { Link } from 'react-router-dom';
import IconSelector from '../../assets/icons/icons';
import styles from '../../styles/styleComponents/Footer.module.scss';
import Line from '../interface/line/Line';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`${styles.footer} _container`}>
                <div className={styles.footer__body}>
                    <div className={styles.footer__categories}>
                        <div className={styles.footer__item}>
                            <div className={styles.footer__item_title}>
                                <h3>Категории</h3>
                            </div>
                            <div className={styles.footer__text}>
                                <Link to='/male'><span>Мужское</span></Link>
                                <Link to='/female'><span>Женское</span></Link>
                                <Link to='/unisex'><span>Унисекс</span></Link>
                            </div>
                        </div>
                        <div className={styles.footer__item}>
                            <div className={styles.footer__item_title}>
                                <h3>О нас</h3>
                            </div>
                            <div className={styles.footer__text}>
                                <Link to='/about'><span>О компани</span></Link>
                                <Link to='/contacts'><span>Контакты</span></Link>
                                <Link to='/faq'><span>FAQ</span></Link>
                            </div>
                        </div>
                        <div className={styles.footer__item}>
                            <div className={styles.footer__item_title}>
                                <h3>Мой аккаунт</h3>
                            </div>
                            <div className={styles.footer__text}>
                                <Link to='/orders'><span>Заказы</span></Link>
                                <Link to='/favorite'><span>Список желаний</span></Link>
                                <Link to='/login'><span>Войти</span></Link>
                            </div>
                        </div>
                        <div className={styles.footer__item}>
                            <div className={styles.footer__item_title}>
                                <h3>Сервис</h3>
                            </div>
                            <div className={styles.footer__text}>
                                <Link to='/security'><span>Безопасная сделка</span></Link>
                                <Link to='/rules'><span>Правила оказания услуг</span></Link>
                                <Link to='/blog'><span>Блог</span></Link>
                            </div>
                        </div>
                        <div className={styles.footer__contacts}>
                            <h3>+38 (099) 70-131-73</h3>
                            <Link to='#' onClick={(e) => {
                                window.location.href = 'mailto:cloza@hotmaile.com'
                                e.preventDefault()
                            }}>
                                <p>cloza@hotmale.com</p>
                            </Link>
                            <IconSelector onClick={() => { console.log('inst') }} id='inst' className={styles.footer__inst_ico} />
                        </div>
                    </div>
                    <Line style={{marginTop: '32px'}}/>
                    <div className={styles.footer__terms}>
                        <div className={styles.footer__terms_field}>
                            <div style={{flex: '1 1 auto'}}>
                                <Link to=''><span>Пользовательское соглашение</span></Link> и <Link to=''><span>политика конфиденциальности</span></Link>
                            </div>
                            <p>©CLOZA 2022. Все права защищены</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}