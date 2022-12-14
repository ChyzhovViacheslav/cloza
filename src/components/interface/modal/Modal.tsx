import IconSelector from '../../../assets/icons/icons'
import s from './Modal.module.scss'

type IModal = {
  children?: any
  active: boolean
  closeModal: (e:boolean) => void
}

export default function Modal({ children, active, closeModal }: IModal) {
  return (
    <div
      className={!active ? s.modal : `${s.modal} ${s.active}`}
      onClick={() => closeModal(false)}>
      <div
        className={s.modal__body}
        onClick={(e) => e.stopPropagation()}>
        {children}
        <div
          className={s.modal__close_btn}
          onClick={() => closeModal(false)}>
          <IconSelector
            id='close' />
        </div>
      </div>
    </div>
  )
}