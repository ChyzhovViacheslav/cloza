import React, { useState } from 'react'
import IconSelector from '../../assets/icons/icons'
import CategoriesItem from '../../components/categoriesitem/CategoriesItem'
import CollapsableItem from '../../components/interface/collapsable/CollapsableItem'
import { extraApi } from '../../services/ExtraService'
import s from '../../styles/styleComponents/Categories.module.scss'

export default function Categories() {
  const [currentCategory, setCurrentCategory] = useState<string>('male')
  const [currentSubCategory, setCurrentSubCategory] = useState<string>('top')

  const { data: categories, isLoading: categoriesIsLoading } = extraApi.useGetCategoriesQuery(null)

  const renderCategories = () => {
    switch (currentSubCategory) {
      case 'top':
        return (
          categories[0].top.map((el: string, i: number) => {
            return <CategoriesItem  currentCategory={currentCategory} name={el} key={i} />
          })
        )
      case 'bottom':
        return (
          categories[0].bottom.map((el: string, i: number) => {
            return <CategoriesItem  currentCategory={currentCategory} name={el} key={i} />
          })
        )
      case 'shoes':
        return (
          categories[0].shoes.map((el: string, i: number) => {
            return <CategoriesItem currentCategory={currentCategory} name={el} key={i} />
          })
        )
      case 'accessories':
        return (
          categories[0].accessories.map((el: string, i: number) => {
            return <CategoriesItem  currentCategory={currentCategory} name={el} key={i} />
          })
        )
    }
  }

  const renderInput = (category: string, subCategory: string) => {
    const renamedSubCategory = () => {
      switch (subCategory) {
        case 'top': return 'Верх'
        case 'bottom': return 'Низ'
        case 'shoes': return 'Обувь'
        case 'accessories': return 'Аксессуары'
      }
    }

    return (
      <span className={currentSubCategory === subCategory && currentCategory === category ? `${s.categories__input} ${s.active}` : s.categories__input}
        onClick={() => {
          setCurrentCategory(category)
          setCurrentSubCategory(subCategory)
        }}>
        {renamedSubCategory()}
      </span>
    )
  }

  return (
    <div className={s.categories}>
      <div className={s.categories__body}>
        <div className={s.categories__content}>
          <div className={s.categories__area}>
            {categoriesIsLoading ?
              <IconSelector className={s.categories__loader} id='loader' />
              :
              renderCategories()}
          </div>
          <div className={s.categories__filter}>
            <CollapsableItem
              isClosed={false}
              title='Мужское'
              className={s.categories__collapse}>
              {renderInput('male', 'top')}
              {renderInput('male', 'bottom')}
              {renderInput('male', 'shoes')}
              {renderInput('male', 'accessories')}
            </CollapsableItem>
            <CollapsableItem
              isClosed
              title='Женское'
              className={s.categories__collapse}>
              {renderInput('female', 'top')}
              {renderInput('female', 'bottom')}
              {renderInput('female', 'shoes')}
              {renderInput('female', 'accessories')}
            </CollapsableItem>
            <CollapsableItem
              isClosed
              title='Унисекс'
              className={s.categories__collapse}>
              {renderInput('unisex', 'top')}
              {renderInput('unisex', 'bottom')}
              {renderInput('unisex', 'shoes')}
              {renderInput('unisex', 'accessories')}
            </CollapsableItem>
          </div>
        </div>
      </div>
    </div>
  )
}