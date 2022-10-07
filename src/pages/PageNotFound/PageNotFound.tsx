import React from 'react'
import Button from '../../components/interface/button/Button';
import s from '../../styles/styleComponents/PageNotFound.module.scss';
import { useNavigate } from 'react-router-dom'

export default function PageNotFound() {
  const navigate = useNavigate()
  return (
    <div className={s.pnf}>
      <div className={s.pnf__body}>
        <div className={s.pnf__item}>
          <span className={s.pnf__404}>
            404
          </span>
          <p>Ничего не найдено</p>
          <Button
            className={s.pnf__btn}
            text='Вернутся на главную'
            onClick={() => navigate('/')} />
        </div>
      </div>
    </div>
  )
}