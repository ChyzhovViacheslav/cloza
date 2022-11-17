import React, { useState, useEffect, useRef } from 'react'
import IconSelector from '../../assets/icons/icons';
import Button from '../../components/interface/button/Button';
import useAuth from '../../hooks/userAuth';
import s from '../../styles/styleComponents/Sell.module.scss';
import MySelect from '../../components/interface/inputs/MySelect';
import MyReactSelect from '../../components/interface/inputs/MyReactSelect';
import { productApi } from '../../services/ProductService';
import { extraApi } from '../../services/ExtraService';
import { useAppSelector } from '../../hooks/redux';
import { Form } from 'react-router-dom';

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
  const [mainPhoto, setMainPhoto] = useState<string>()
  const [additionalPhoto, setAdditionalPhoto] = useState<any>([])

  const { username } = useAuth()
  const [addProduct, { isLoading }] = productApi.useAddProductMutation()
  const { data: brands } = extraApi.useGetAllBrandsQuery(null)
  const { data: categories } = extraApi.useGetCategoriesQuery(null)
  const { clothSize, colors, conditions, mainCategories } = useAppSelector(state => state.filterReducer)

  const mainPhotoRef = useRef(null)
  const additionPhotoRef = useRef([])

  useEffect(() => {

  }, [mainPhoto, additionalPhoto.length])

  const renderSubCategory = () => {
    switch (category) {
      case 'top':
        return (
          <>
            {categories[0]?.top.map((el: string, i: number) => {
              return (
                <option key={i}>{el}</option>
              )
            })}
          </>
        )
      case 'bottom':
        return (
          <>
            {categories[0]?.bottom.map((el: string, i: number) => {
              return (
                <option key={i}>{el}</option>
              )
            })}
          </>
        )
      case 'shoes':
        return (
          <>
            {categories[0]?.shoes.map((el: string, i: number) => {
              return (
                <option key={i}>{el}</option>
              )
            })}
          </>
        )
      case 'accessories':
        return (
          <>
            {categories[0]?.accessories.map((el: string, i: number) => {
              return (
                <option key={i}>{el}</option>
              )
            })}
          </>
        )
    }
  }

  const renderSize = () => {
    return (
      clothSize?.map((el: string) => {
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
    const customData = brands && brands[0].brands.map((el: string) => {
      return ({
        value: el, label: el
      })
    })

    return (
      <MyReactSelect
        className={`${s.sell__inputs} ${s.sell__select}`}
        isMulti={false}
        onChange={(e: any) => setBrand(e.value)}
        data={customData} />
    )
  }

  const renderMainImage = () => {
    return (
      <form ref={mainPhotoRef} className={s.sell__label}>
        <p>Основное фото</p>
        {!mainPhoto ? <label className={`${s.sell__img_btn} ${s.sell__inputs}`}>
          <IconSelector id='plus' />
          <span>Основное фото</span>
          <input
            type={'file'}
            name='mainPhoto'
            accept="image/png, image/jpeg, image/jpg"
            style={{ display: 'none' }}
            onChange={async (e) => {
              setMainPhoto(await toBase64(e.target.files[0]));
            }}
          />
        </label> :
          <div className={s.sell__inputs_wrapper}>
            <div className={s.sell__images_wrapper}>
              <img alt='mainImg' src={mainPhoto} />
              <div className={s.sell__images_controls}>
                <IconSelector
                  id='close'
                  className={s.sell__images_delete}
                  onClick={() => {
                    mainPhotoRef.current.reset()
                    setMainPhoto(null)
                  }} />
              </div>
            </div>
          </div>
        }
      </form>
    )
  }

  const renderAdditionalImages = () => {
    const indexes = []
    for (let index = 0; index < additionalPhoto.length + 1 && index < 5; index++) {
      indexes.push(index)
    }
    return (
      indexes.map((el: any, index:number) => {
        return (
          <form key={el} ref={elems => additionPhotoRef.current[index] = elems} className={s.sell__image_multiple}>
            <div className={s.sell__images_wrapper}>
              {additionalPhoto[el] ?
                <>
                  <img alt='adtImg' src={additionalPhoto[el]} />
                  <label className={s.sell__images_controls}>
                    <IconSelector
                      id='close'
                      className={s.sell__images_delete}
                      onClick={() => {
                        additionPhotoRef.current[index].reset()
                        setAdditionalPhoto(additionalPhoto.filter((elem:any, i:any) => i !== el))
                      }} />
                  </label>
                </> :
                <div className={s.sell__img_empty}>
                  <span>Нет изображения</span>
                </div>}
            </div>
            <label className={`${s.sell__img_btn} ${s.sell__img_m_btn}`}>
              <span>Добавить фото</span>
              <input
                type='file'
                name='multipleFile'
                accept="image/png, image/jpeg, image/jpg"
                style={{display: 'none'}}
                onChange={async (e) => setAdditionalPhoto([...additionalPhoto, await toBase64(e.target.files[0])])} />
            </label>
          </form>
        )
      })
    )
  }

  const renderColors = () => {
    interface IColorCode {
      colorCode: string
      colorName: string
    }

    const colorCode = colors?.map((el: string) => {
      switch (el) {
        case 'blue': return { colorCode: '#337ab6', colorName: el }
        case 'green': return { colorCode: '#5cb85c', colorName: el }
        case 'orange': return { colorCode: '#f0ac4e', colorName: el }
        case 'red': return { colorCode: '#ff0000', colorName: el }
        case 'lightblue': return { colorCode: '#5bc0de', colorName: el }
        case 'black': return { colorCode: '#282a3c', colorName: el }
        case 'violet': return { colorCode: '#800080', colorName: el }
        case 'gray': return { colorCode: '#777777', colorName: el }
        case 'white': return { colorCode: '#ffffff', colorName: el }
        case 'brown': return { colorCode: '#d9534f', colorName: el }
        default: return el
      }
    })

    return (
      colorCode.map((el: IColorCode) => {
        const renamedColor = () => {
          switch (el.colorName) {
            case 'blue': return 'Синий'
            case 'green': return 'Зелёный'
            case 'orange': return 'Оранжевый'
            case 'red': return 'Красный'
            case 'lightblue': return 'Голубой'
            case 'black': return 'Чёрный'
            case 'violet': return 'Фиолетовый'
            case 'gray': return 'Серый'
            case 'white': return 'Белый'
            case 'brown': return 'Коричневый'
          }
        }
        return (
          <div key={el.colorName} className={s.sell__checkbox}>
            <label htmlFor={el.colorName}>{renamedColor()}</label>
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
      trade: trade,
      mainPhoto: mainPhoto,
      additionalsPhotos: additionalPhoto
    })
  }


  const toBase64 = (file: File): Promise<string> => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || '');
    reader.onerror = error => reject(error);
  })

  return (
    <div className={s.sell}>
      <div className={s.sell__body}>
        <div className={s.sell__title}>
          <h1>Выставить товар на продажу</h1>
        </div>
        <div className={s.sell__form}>
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
              data={conditions} />
          </div>
          <div className={`${s.sell__main_category} ${s.sell__label}`}>
            <p>Основная категория</p>
            <MySelect
              defaultValue='Выберите категорию'
              onChange={(e) => setMainCategory(e.target.value)}
              data={mainCategories} />
          </div>
          <div className={`${s.sell__categories} ${s.sell__label}`}>
            <p>Подкатегория</p>
            <MySelect
              defaultValue='Выберите подкатегорию'
              onChange={(e) => setCategory(e.target.value)}
              data={["top", "bottom", "shoes", "accessories"]} />
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
          {renderMainImage()}
          <div className={s.sell__label}>
            <p>Галерея (максимум 5 фото)</p>
            <div className={s.sell__inputs_wrapper}>
              {renderAdditionalImages()}
            </div>
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
            id={isLoading ? 'second-loader' : 'check-mark'}
            className={s.sell__btn}
            text='Создать обьявление'
            onClick={(e) => {
              e.preventDefault()
              postProduct()
            }} />
        </div>
      </div>
    </div>
  )
}