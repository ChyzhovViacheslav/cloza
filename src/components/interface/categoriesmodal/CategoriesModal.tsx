import React from 'react'
import IconSelector from '../../../assets/icons/icons'
import { useAppDispatch } from '../../../hooks/redux'
import { extraApi } from '../../../services/ExtraService'
import { filterSlice } from '../../../store/reducers/ProductFilter'
import ErrorConnection from '../errorconnection/ErrorConnection'
import Modal from '../modal/Modal'
import s from './CategoriesModal.module.scss'

interface ICategoriesModal {
    modalIsActive: boolean
    setModalIsActive: (value: boolean) => void
}

export default function CategoriesModal({ modalIsActive, setModalIsActive}: ICategoriesModal) {
    const { data: categories, isLoading: categoriesLoading, isError } = extraApi.useGetCategoriesQuery(null)
    const { setSubCategories } = filterSlice.actions
    const dispatch = useAppDispatch()

    const renderCategories = (category: []) => {
        if(isError){
            return <ErrorConnection/>
        } else {
            return (
                category.map((el: string, i: number) => {
                    return <p key={i} onClick={() => {
                        dispatch(setSubCategories([el]))
                        setModalIsActive(false)
                    }}>{el}</p>
                })
            )
        }
    }

    return (
        <Modal active={modalIsActive} closeModal={setModalIsActive}>
            {categoriesLoading || isError ? <IconSelector className={s.modal__loader} id='loader' /> : <div className={s.modal}>
                <div className={s.modal__column}>
                    <h2>Верх</h2>
                    {renderCategories(categories[0]?.top)}
                </div>
                <div className={s.modal__column}>
                    <h2>Низ</h2>
                    {renderCategories(categories[0]?.bottom)}
                </div>
                <div className={s.modal__column}>
                    <h2>Обувь</h2>
                    {renderCategories(categories[0]?.shoes)}
                </div>
                <div className={s.modal__column}>
                    <h2>Аксессуары</h2>
                    {renderCategories(categories[0]?.accessories)}
                </div>
            </div>}
        </Modal>
    )
}