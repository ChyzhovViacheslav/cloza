import React, { useState } from 'react'
import IconSelector from '../../assets/icons/icons';
import Button from '../../components/interface/button/Button';
import s from '../../styles/styleComponents/Sell.module.scss';

export default function Sell() {
  const [name, setName] = useState('')
  const [condition, setCondition] = useState('')
  const [mainCategory, setMainCategory] = useState('')
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(null)
  const [discount, setDiscount] = useState(null)
  const [amount, setAmount] = useState(1)
  const [trade, setTrade] = useState('')
  
  return (
    <div className={s.sell}>
      <div className={s.sell__body}>
        <div className={s.sell__title}>
          <h1>Выставить товар на продажу</h1>
        </div>
        <form className={s.sell__form}>
          <div className={`${s.sell__name} ${s.sell__label}`}>
            <p>Название</p>
            <input className={`${s.sell__product_name} ${s.sell__inputs}`} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className={`${s.sell__condition} ${s.sell__label}`}>
            <p>Состояние</p>
            <select className={s.sell__inputs}>
              <option value={'condition-1'}>Новая с биркой</option>
              <option value={'condition-2'}>Новая без бирки</option>
              <option value={'condition-3'}>Небольшие дефекты</option>
              <option value={'condition-4'}>Надевалась один раз</option>
              <option value={'condition-5'}>Надевалась несклько раз</option>
            </select>
          </div>
          <div className={`${s.sell__main_category} ${s.sell__label}`}>
            <p>Основная категория</p>
            <select className={s.sell__inputs}>
              <option value={'female'}>Женское</option>
              <option value={'male'}>Мужское</option>
              <option value={'unisex'}>Унисекс</option>
            </select>
          </div>
          <div className={`${s.sell__categories} ${s.sell__label}`}>
            <p>Подкатегория</p>
            <select className={s.sell__inputs}>
              <option>Верх</option>
              <option>Низ</option>
              <option>Обувь</option>
              <option>Аксессуары</option>
            </select>
          </div>
          <div className={`${s.sell__subcategories} ${s.sell__label}`}>
            <p>Субкатегория</p>
            <select className={s.sell__inputs}>
              <option>Футболки</option>
              <option>Футболки</option>
              <option>Футболки</option>
              <option>Футболки</option>
              <option>Футболки</option>
              <option>Футболки</option>
              <option>Футболки</option>
              <option>Футболки</option>
            </select>
          </div>
          <div className={`${s.sell__brands} ${s.sell__label}`}>
            <p>Бренд</p>
            <select className={s.sell__inputs}>
              <option>Gucci</option>
              <option>Gucci</option>
              <option>Gucci</option>
              <option>Gucci</option>
              <option>Gucci</option>
            </select>
          </div>
          <div className={`${s.sell__main_photo} ${s.sell__label}`}>
            <p>Основное фото</p>
            <button className={`${s.sell__img_btn} ${s.sell__inputs}`}><IconSelector id='plus'/><span>Основное фото</span></button>
          </div>
          <div className={`${s.sell__photos} ${s.sell__label}`}>
            <p>Галерея (максимум 5 фото)</p>
            <button className={`${s.sell__img_btn} ${s.sell__inputs}`}><IconSelector id='plus'/><span>Добавить фото</span></button>
          </div>
          <div className={`${s.sell__size} ${s.sell__label}`}>
            <p>Размер</p>
            <div className={s.sell__inputs}>
              <div className={s.sell__checkbox}>
                <label htmlFor='XL'>XL</label>
                <input type={'checkbox'} id={'XL'} />
              </div>
              <div className={s.sell__checkbox}>
                <label htmlFor='XXL'>XXL</label>
                <input type={'checkbox'} id={'XXL'} />
              </div>
              <div className={s.sell__checkbox}>
                <label htmlFor='M'>M</label>
                <input type={'checkbox'} id={'M'} />
              </div>
              <div className={s.sell__checkbox}>
                <label htmlFor='L'>L</label>
                <input type={'checkbox'} id={'L'} />
              </div>
              <div className={s.sell__checkbox}>
                <label htmlFor='S'>S</label>
                <input type={'checkbox'} id={'S'} />
              </div>
              <div className={s.sell__checkbox}>
                <label htmlFor='XS'>XS</label>
                <input type={'checkbox'} id={'XS'} />
              </div>
              <div className={s.sell__checkbox}>
                <label htmlFor='XXS'>XXS</label>
                <input type={'checkbox'} id={'XXS'} />
              </div>
            </div>
          </div>
          <div className={`${s.sell__color} ${s.sell__label}`}>
            <p>Цвет (Выберите основной цвет.)</p>
            <div className={s.sell__inputs}>
              <div className={s.sell__checkbox}>
                 <label htmlFor='darkblue'>Синий</label>
                 <input style={{backgroundColor: '#337ab6'}} type={'checkbox'} id={'darkblue'}/>
              </div>
              <div className={s.sell__checkbox}>
                 <label htmlFor='green'>Зелёный</label>
                 <input style={{backgroundColor: '#5cb85c'}} type={'checkbox'} id={'green'}/>
              </div>
              <div className={s.sell__checkbox}>
                 <label htmlFor='yellow'>Жёлтый</label>
                 <input style={{backgroundColor: '#f0ac4e'}} type={'checkbox'} id={'yellow'}/>
              </div>
              <div className={s.sell__checkbox}>
                 <label htmlFor='red'>Красный</label>
                 <input style={{backgroundColor: '#ff0000'}} type={'checkbox'} id={'red'}/>
              </div>
              <div className={s.sell__checkbox}>
                 <label htmlFor='blue'>Голубой</label>
                 <input style={{backgroundColor: '#5bc0de'}} type={'checkbox'} id={'blue'}/>
              </div>
              <div className={s.sell__checkbox}>
                 <label htmlFor='black'>Чёрный</label>
                 <input style={{backgroundColor: '#282a3c'}} type={'checkbox'} id={'black'}/>
              </div>
              <div className={s.sell__checkbox}>
                 <label htmlFor='purple'>Фиолетовый</label>
                 <input style={{backgroundColor: '#800080'}} type={'checkbox'} id={'purple'}/>
              </div>
              <div className={s.sell__checkbox}>
                 <label htmlFor='gray'>Серый</label>
                 <input style={{backgroundColor: '#777777'}} type={'checkbox'} id={'gray'}/>
              </div>
              <div className={s.sell__checkbox}>
                 <label htmlFor='white'>Белый</label>
                 <input style={{backgroundColor: '#ffffff'}} type={'checkbox'} id={'white'}/>
              </div>
              <div className={s.sell__checkbox}>
                 <label htmlFor='brown'>Коричневый</label>
                 <input style={{backgroundColor: '#d9534f'}} type={'checkbox'} id={'brown'}/>
              </div>
            </div>
          </div>
          <div className={`${s.sell__description} ${s.sell__label}`}>
            <p>Описание товара</p>
            <textarea style={{minHeight: '120px', resize: 'none'}} className={s.sell__inputs}/>
          </div>
          <div className={`${s.sell__price} ${s.sell__label}`}>
            <p>Цена</p>
            <div className={s.sell__inputs}>
              <input style={{flex: '1 1 auto'}} type={'text'}/>
              <IconSelector className={s.sell__uah} id='uah'/>
            </div>
          </div>
          <div className={`${s.sell__price} ${s.sell__label}`}>
            <p>Цена со скидкой</p>
            <div className={s.sell__inputs}>
              <input  style={{flex: '1 1 auto'}} type={'text'}/>
              <IconSelector className={s.sell__uah} id='uah'/>
            </div>
          </div>
          <div className={`${s.sell__amount} ${s.sell__label}`}>
            <p>Кол-во (Оставить пустым и товар будет без ограничений)</p>
            <div className={s.sell__inputs}>
              <input type={'number'}/>
            </div>
          </div>
          <div className={`${s.sell__trade} ${s.sell__label}`}>
            <p>Обмен</p>
            <div className={s.sell__inputs}>
              <div className={s.sell__checkbox}>
                <input id='trade' type={'checkbox'}/>
                <label htmlFor="trade">Возможен обмен</label>
              </div>
            </div>
          </div>
          <Button id='check-mark' className={s.sell__btn} text='Сделать обьявление'/>
        </form>
      </div>
    </div>
  )
}