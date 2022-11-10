import React, { useState } from 'react'
import IconSelector from '../../assets/icons/icons';
import Button from '../../components/interface/button/Button';
import useAuth from '../../hooks/userAuth';
import { postApi } from '../../services/PostService';
import s from '../../styles/styleComponents/Sell.module.scss';
import Select from 'react-select';
import MySelect from '../../components/interface/inputs/MySelect';
import MyReactSelect from '../../components/interface/inputs/MyReactSelect';

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
  const [trade, setTrade] = useState(false)

  const { username } = useAuth()
  const [addProduct, { isLoading }] = postApi.useAddProductMutation()
  const {data: brands} = postApi.useFetchAllBrandsQuery(null)
  const {data: categories} = postApi.useFetchAllCategoriesQuery(null)

  const conditionMap = [
    "Новая с биркой",
    "Новая без бирки",
    "Небольшие дефекты",
    "Надевалась один раз",
    "Надевалась несколько раз"
  ]

  const mainCategoriesMap = [
    "Женское",
    "Мужское",
    "Унисекс"
  ]

  const renderSubCategory = () => {
    switch (category) {
      case 'Верх':
        return (
          <>
            {categories.top?.map((el:any, i:any) => {
              return(
                <option key={i}>{el}</option>
              )
            })}
          </>
        )
      case 'Низ':
        return (
          <>
            {categories.bottom?.map((el, i) => {
              return(
                <option key={i}>{el}</option>
              )
            })}
          </>
        )
      case 'Обувь':
        return (
          <>
            {categories.shoes?.map((el, i) => {
              return(
                <option key={i}>{el}</option>
              )
            })}
          </>
        )
      case 'Аксессуары':
        return (
          <>
            {categories.accesories?.map((el, i) => {
              return(
                <option key={i}>{el}</option>
              )
            })}
          </>
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
    const customData = brands?.map((el:string) => {
      return ({
        value: el, label: el
      })
    })

    return (
      <MyReactSelect
        className={`${s.sell__inputs} ${s.sell__select}`}
        isMulti={false}
        onChange={(e:any) => setBrand(e.value)}
        data={customData}/>
    )
  }

  const renderColors = () => {
    const colors = [
      { colorCode: '#337ab6', colorName: 'Синий' },
      { colorCode: '#5cb85c', colorName: 'Зелёный' },
      { colorCode: '#f0ac4e', colorName: 'Оранжевый' },
      { colorCode: '#ff0000', colorName: 'Красный' },
      { colorCode: '#5bc0de', colorName: 'Голубой' },
      { colorCode: '#282a3c', colorName: 'Чёрный' },
      { colorCode: '#800080', colorName: 'Фиолетовый' },
      { colorCode: '#777777', colorName: 'Серый' },
      { colorCode: '#ffffff', colorName: 'Белый' },
      { colorCode: '#d9534f', colorName: 'Коричневый' }
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
      saler: username,
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
            <MySelect 
              defaultValue='Без бирки' 
              onChange={(e) => setCondition(e.target.value)}
              data={conditionMap}/>
          </div>
          <div className={`${s.sell__main_category} ${s.sell__label}`}>
            <p>Основная категория</p>
            <MySelect 
              defaultValue='Выберите категорию' 
              onChange={(e) => setMainCategory(e.target.value)}
              data={mainCategoriesMap}/>
          </div>
          <div className={`${s.sell__categories} ${s.sell__label}`}>
            <p>Подкатегория</p>
            <MySelect 
              defaultValue='Выберите подкатегорию' 
              onChange={(e) => setCategory(e.target.value)}
              data={["Верх", "Низ", "Обувь", "Аксессуары"]}/>
          </div>
          <div className={`${s.sell__subcategories} ${s.sell__label}`}>
            <p>Субкатегория</p>
            <MySelect
              defaultValue='Выберите субкатегорию'
              onChange={(e) => setSubCategory(e.target.value)}>
              {renderSubCategory()}
            </MySelect>
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
              <input onChange={(e) => setAmount(parseInt(e.target.value))} type={'number'} />
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