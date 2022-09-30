import React from 'react'
import IconSelector from '../../assets/icons/icons'
import {Link} from 'react-router-dom'
import styles from '../../styles/styleComponents/Header.module.scss'
import Button from '../interface/Button'

export default function Header() {

    return (
        <nav className={styles.header}>
            <div className={styles.header + ' _container'}>
                <div className={styles.header__body}>
                    <Link to='/'><IconSelector className={styles.header__logo} id='logo' /></Link>
                    <div className={styles.header__links}>
                        <Link to='/male'><h2>Мужское</h2></Link>
                        <Link to='/female'><h2>Женское</h2></Link>
                        <Link to='/unisex'><h2>Унисекс</h2></Link>
                        <Link to='/sale'><h2 style={{color: 'var(--main-red)'}}>Sale</h2></Link>
                        <Link to='/faq'><h2>FAQ</h2></Link>
                        <Link to='/security'><h2>Безопасная сделка</h2></Link>
                        <Link to='/rules'><h2>Правила пользования</h2></Link>
                    </div>
                    <div className={styles.header__actives}>
                        <div style={{position: 'relative', height: '20px'}}>
                            <IconSelector onClick={() => console.log('add to favorite')} className={styles.header__favorite} id='heart'/>
                            <span className={styles.header__counter}>6</span>
                        </div>
                        <IconSelector onClick={() => console.log('my account')} className={styles.header__person} id='person'/>
                        <Button text='Продать' className='header__button'/>
                    </div>
                </div>
            </div>
        </nav>
    )
}