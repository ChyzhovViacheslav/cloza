import React from 'react'
import s from '../../styles/styleComponents/Rules.module.scss'
type Props = {}

export default function Rules({ }: Props) {
    return (
        <div className={s.rules}>
            <div className={s.rules__body}>
                <div className={s.rules__title}>
                    <h1>Правила пользования</h1>
                </div>
                <div className={s.rules__text_field}>
                    <div className={s.rules__sub_title}>
                        <p>
                            Разрешенные стили одежды для публикации streetwear, sportswear, casual, vintage sportswear, vintage casual, new vintage, new wave
                        </p>
                    </div>
                    <div className={s.rules__list_title}>
                        <h3>Список товаров, запрещённых к публикации</h3>
                    </div>
                    <ul className={s.rules__list}>
                        <p>
                            <li>Классика (костюмы, брюки, туфли, пиджаки, галстуки, бабочки)</li>
                        </p>
                        <p>
                            <li>Платья, вечерние платья (если они не относятся к стилям, описанным выше)</li>
                        </p>
                        <p>
                            <li>Нижнее белье (мужское и женское)</li>
                        </p>
                        <br />
                        <p>
                            <li>Товары с фото низкого качества (<a href='http://prntscr.com/skkcya'>http://prntscr.com/skkcya</a>)</li>
                        </p>
                        <p>
                            <li>Товары низкого качества (<a href='http://prntscr.com/skkq4n http://prntscr.com/skl11x'>http://prntscr.com/skkq4n</a>)</li>
                        </p>
                        <p>
                            <li>Новые товары из магазинов с no name брендами</li>
                        </p>
                        <br />
                        <p>
                            <li>Запрещены подделки любого вида/уровня. За постинг подделок - <span style={{ fontWeight: '500' }}>бан всего аккаунта.</span></li>
                        </p>
                    </ul>
                </div>
            </div>
        </div>
    )
}