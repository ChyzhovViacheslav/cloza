import React from 'react'
import s from '../../styles/styleComponents/About.module.scss'

export default function About() {
    return (
        <div className={s.about}>
            <div className={s.about__body}>
                <div className={s.about__title}>
                    <h1>О компании</h1>
                </div>
                <div className={s.about__text_field}>
                    <p>
                        CLOZA – это маркетплейс одежды, агрегирующий в себе такие стили, как: streetwear, sportswear, casual, vintage sportswear, vintage sportswear, vintage casual, new vintage, new wave. Каждый пользователь нашего сервиса может выступать в роли продавца или покупателя.
                    </p>
                    <p>
                        Сталкивались с ситуацией, когда в вашем городе негде купить интересный стаф, все магазины продают плюс-минус одно и тоже, так еще и по неадекватным ценам? Задача CLOZA – это предоставить вам выбор интересных, брендовых вещей по адекватной цене,  в которой можно пойти на тусовку, бар, вечеринку, работу и т.д. При этом мы тщательно следим за оригинальностью продукции и безопасностью для покупателей и продавцов.
                    </p>
                </div>
            </div>
        </div>
    )
}