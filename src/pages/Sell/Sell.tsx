import React, { useState } from 'react'
import s from '../../styles/styleComponents/Sell.module.scss';

export default function Sell() {
  const [name, setName] = useState('')
  return (
    <div className={s.sell}>
      <div className={s.sell__body}>
        <div className={s.sell__title}>
          <h1>Выставить товар на продажу</h1>
        </div>
        <form className={s.sell__form}>
          <label>
            <p>Название</p>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            <p>Состояние</p>
            <select>
              <option value={'condition-1'}>Новая с биркой</option>
              <option value={'condition-2'}>Новая без бирки</option>
              <option value={'condition-3'}>Небольшие дефекты</option>
              <option value={'condition-4'}>Надевалась один раз</option>
              <option value={'condition-5'}>Надевалась несклько раз</option>
            </select>
          </label>
          <label>
            <p>Основная категория</p>
            <select>
              <option value={'female'}>Женское</option>
              <option value={'male'}>Мужское</option>
              <option value={'unisex'}>Унисекс</option>
            </select>
          </label>
          <label>
            <p>Подкатегория</p>
            <select>
              <option>Верх</option>
              <option>Низ</option>
              <option>Обувь</option>
              <option>Аксессуары</option>
            </select>
          </label>
          <label>
            <p>Субкатегория</p>
            <select>
              <option>Футболки</option>
              <option>Футболки</option>
              <option>Футболки</option>
              <option>Футболки</option>
              <option>Футболки</option>
              <option>Футболки</option>
              <option>Футболки</option>
              <option>Футболки</option>
            </select>
          </label>
          <label>
            <p>Бренд</p>
            <select>
              <option>Gucci</option>
              <option>Gucci</option>
              <option>Gucci</option>
              <option>Gucci</option>
              <option>Gucci</option>
            </select>
          </label>
        </form>
      </div>
    </div>
  )
}