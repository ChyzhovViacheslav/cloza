import React, { useState } from 'react'
import IconSelector from '../../assets/icons/icons';
import Button from '../../components/interface/button/Button';
import useAuth from '../../hooks/userAuth';
import { postApi } from '../../services/PostService';
import s from '../../styles/styleComponents/Sell.module.scss';
import Select from 'react-select';

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
  const [amount, setAmount] = useState('')
  const [trade, setTrade] = useState(false)

  const { userName } = useAuth()
  const [addProduct, { isLoading }] = postApi.useAddProductMutation()

  const renderSubCategory = () => {
    switch (category) {
      case 'top':
        return (
          <>
            <option>Футболка</option>
            <option>Джемпер</option>
            <option>Спортивный костюм</option>
            <option>Рубашка</option>
            <option>Поло</option>
            <option>Майка</option>
            <option>Пиджак</option>
            <option>Худи</option>
            <option>Свитшот</option>
            <option>Свитер</option>
            <option>Олимпийка</option>
            <option>Лонгслив</option>
            <option>Толстовка</option>
            <option>Кардиган</option>
            <option>Куртки</option>
            <option>Ветровка</option>
            <option>Бомбер</option>
            <option>Анорак</option>
            <option>Пальто</option>
            <option>Жилетка</option>
          </>
        )
      case 'bottom':
        return (
          <>
            <option>Джинсы</option>
            <option>Брюки</option>
            <option>Спортивные штаны</option>
            <option>Джоггеры</option>
            <option>Шорты</option>
          </>
        )
      case 'shoes':
        return (
          <>
            <option>Кроссовки</option>
            <option>Ботинки</option>
            <option>Мокасины</option>
            <option>Слипоны</option>
            <option>Кеды</option>
            <option>Туфли</option>
            <option>Лоферы</option>
            <option>Слиперы</option>
            <option>Сапоги</option>
          </>
        )
      case 'accesories':
        return (
          <>
            <option>Шапка</option>
            <option>Шарфы</option>
            <option>Сумки</option>
            <option>Перчатки</option>
            <option>Ремень</option>
            <option>Кошелёк</option>
            <option>Очки</option>
            <option>Часы</option>
            <option>Рюкзак</option>
            <option>Панама</option>
            <option>Значки</option>
            <option>Кепка</option>
          </>
        )
      default:
        return (
          <option>Выберите категорию</option>
        )
    }
  }

  const renderSize = () => {
    const sizeType = ['XXL', 'XL', 'L', 'M', 'S', 'XS', 'XXS']
    return (
      sizeType.map(el => {
        return (
          <div key={el} className={s.sell__checkbox}>
            <label htmlFor={el}>{el}</label>
            <input name='size' onChange={(e) => setSize(e.target.id)} type={'radio'} id={el} />
          </div>
        )
      })
    )
  }

  const renderBrands = () => {
    const brands = [
      { value: 'Без бренда', label: 'Без бренда' },
      { value: 'Adidas', label: 'Adidas' },
      { value: 'Adidas Originals', label: 'Adidas Originals' },
      { value: 'Armani Exchange', label: 'Armani Exchange' },
      { value: 'Alexander Mcqueen', label: 'Alexander Mcqueen' },]
    const customStyles = {
      control: () => ({
        display: 'flex',
        padding: '0px',
        width: '100%',
        border: '1px solid var(--gray-light)',
        borderRadius: '8px'
      }),
      option: () => ({
        padding: '8px 16px'
      }),
      valueContainer: () => ({
        display: 'flex',
        padding: '8px 16px',
        alignItems: 'center',
        flex: '1 1 auto',
        height: '40px'
      }),
      singleValue: () => ({
        fontFamily: 'PTRoot',
        fontSize: '16px'
      }),
      input: () => ({
        padding: '0px',
        margin: '0px'
      }),
      indicatorSeparator: () => ({
        display: 'none'
      })
    }
    return (
      <Select
        placeholder=''
        className={`${s.sell__inputs} ${s.sell__select}`}
        styles={customStyles}
        onChange={(e) => setBrand(e.value)}
        options={brands} 
        defaultValue={brands[0]}/>
    )
  }

  const renderColors = () => {
    const colors = [
      { colorCode: '#337ab6', colorName: 'darkblue' },
      { colorCode: '#5cb85c', colorName: 'green' },
      { colorCode: '#f0ac4e', colorName: 'yellow' },
      { colorCode: '#ff0000', colorName: 'red' },
      { colorCode: '#5bc0de', colorName: 'blue' },
      { colorCode: '#282a3c', colorName: 'black' },
      { colorCode: '#800080', colorName: 'purple' },
      { colorCode: '#777777', colorName: 'gray' },
      { colorCode: '#ffffff', colorName: 'white' },
      { colorCode: '#d9534f', colorName: 'brown' }
    ]
    return (
      colors.map(el => {
        return (
          <div key={el.colorName} className={s.sell__checkbox}>
            <label htmlFor={el.colorName}>{el.colorName}</label>
            <input onChange={(e) => setColor(e.target.id)} style={{ backgroundColor: el.colorCode }} name={'color'} type={'radio'} id={el.colorName} />
          </div>
        )
      })
    )
  }

  const postProduct = async () => {
    await addProduct({
      saler: userName,
      name: name,
      condition: condition,
      mainCategory: mainCategory,
      category: category,
      subCategory: subCategory,
      brand: brand,
      size: size,
      color: color,
      description: description,
      price: price,
      discount: discount,
      amount: amount,
      trade: trade
    })
  }

  return (
    <div className={s.sell}>
      <div className={s.sell__body}>
        <div className={s.sell__title}>
          <h1>Выставить товар на продажу</h1>
        </div>
        <form className={s.sell__form}>
          <div className={`${s.sell__name} ${s.sell__label}`}>
            <p>Название</p>
            <input
              className={`${s.sell__product_name} ${s.sell__inputs}`}
              value={name}
              onChange={(e) => setName(e.target.value)} />
          </div>
          <div className={`${s.sell__condition} ${s.sell__label}`}>
            <p>Состояние</p>
            <select onChange={(e) => setCondition(e.target.value)} className={s.sell__inputs}>
              <option>Выберите состояние</option>
              <option value={'condition-1'}>Новая с биркой</option>
              <option value={'condition-2'}>Новая без бирки</option>
              <option value={'condition-3'}>Небольшие дефекты</option>
              <option value={'condition-4'}>Надевалась один раз</option>
              <option value={'condition-5'}>Надевалась несклько раз</option>
            </select>
          </div>
          <div className={`${s.sell__main_category} ${s.sell__label}`}>
            <p>Основная категория</p>
            <select onChange={(e) => setMainCategory(e.target.value)} className={s.sell__inputs}>
              <option>Выберите категорию</option>
              <option value={'female'}>Женское</option>
              <option value={'male'}>Мужское</option>
              <option value={'unisex'}>Унисекс</option>
            </select>
          </div>
          <div className={`${s.sell__categories} ${s.sell__label}`}>
            <p>Подкатегория</p>
            <select onChange={(e) => setCategory(e.target.value)} className={s.sell__inputs}>
              <option>Выберите категорию</option>
              <option value={'top'}>Верх</option>
              <option value={'bottom'}>Низ</option>
              <option value={'shoes'}>Обувь</option>
              <option value={'accesories'}>Аксессуары</option>
            </select>
          </div>
          <div className={`${s.sell__subcategories} ${s.sell__label}`}>
            <p>Субкатегория</p>
            <select onChange={(e) => setSubCategory(e.target.value)} className={s.sell__inputs}>
              {renderSubCategory()}
            </select>
          </div>
          <div className={`${s.sell__brands} ${s.sell__label}`}>
            <p>Бренд</p>
            {renderBrands()}
          </div>
          <div className={`${s.sell__main_photo} ${s.sell__label}`}>
            <p>Основное фото</p>
            <button className={`${s.sell__img_btn} ${s.sell__inputs}`}><IconSelector id='plus' /><span>Основное фото</span></button>
          </div>
          <div className={`${s.sell__photos} ${s.sell__label}`}>
            <p>Галерея (максимум 5 фото)</p>
            <button className={`${s.sell__img_btn} ${s.sell__inputs}`}><IconSelector id='plus' /><span>Добавить фото</span></button>
          </div>
          <div className={`${s.sell__size} ${s.sell__label}`}>
            <p>Размер</p>
            <div className={s.sell__inputs}>
              {renderSize()}
            </div>
          </div>
          <div className={`${s.sell__color} ${s.sell__label}`}>
            <p>Цвет (Выберите основной цвет.)</p>
            <div className={s.sell__inputs}>
              {renderColors()}
            </div>
          </div>
          <div className={`${s.sell__description} ${s.sell__label}`}>
            <p>Описание товара</p>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              style={{ minHeight: '120px', resize: 'none' }}
              className={s.sell__inputs} />
          </div>
          <div className={`${s.sell__price} ${s.sell__label}`}>
            <p>Цена</p>
            <div className={s.sell__inputs}>
              <input
                onChange={(e) => setPrice(e.target.value)}
                style={{ flex: '1 1 auto' }}
                type={'text'} />
              <IconSelector className={s.sell__uah} id='uah' />
            </div>
          </div>
          <div className={`${s.sell__price} ${s.sell__label}`}>
            <p>Цена со скидкой</p>
            <div className={s.sell__inputs}>
              <input
                onChange={(e) => setDiscount(e.target.value)}
                style={{ flex: '1 1 auto' }}
                type={'text'} />
              <IconSelector className={s.sell__uah} id='uah' />
            </div>
          </div>
          <div className={`${s.sell__amount} ${s.sell__label}`}>
            <p>Кол-во (Оставить пустым и товар будет без ограничений)</p>
            <div className={s.sell__inputs}>
              <input onChange={(e) => setAmount(e.target.value)} type={'number'} />
            </div>
          </div>
          <div className={`${s.sell__trade} ${s.sell__label}`}>
            <p>Обмен</p>
            <div className={s.sell__inputs}>
              <div className={s.sell__checkbox}>
                <input onChange={(e) => setTrade(e.target.checked)} id='trade' type={'checkbox'} />
                <label htmlFor="trade">Возможен обмен</label>
              </div>
            </div>
          </div>
          <Button
            id='check-mark'
            className={s.sell__btn}
            text='Сделать обьявление'
            onClick={(e) => {
              e.preventDefault()
              postProduct()
            }} />
        </form>
      </div>
    </div>
  )
}