import React, { useState, useRef, useEffect } from 'react'
import IconSelector from '../../assets/icons/icons'
import { Link, useNavigate } from 'react-router-dom'
import s from '../../styles/styleComponents/Header.module.scss'
import Button from '../interface/button/Button'
import { loginModalSlice } from '../../store/reducers/ModalSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import useAuth from '../../hooks/userAuth'
import { userSlice } from '../../store/reducers/UserSlice'
import { smModalSlice } from '../../store/reducers/SmModalSlice'
import { extraSlice } from '../../store/reducers/ExtraSlice'
import { productApi } from '../../services/ProductService'
import { authUser } from '../../services/AuthUser'
import Line from '../interface/line/Line'

interface IModalAuthorized {
    loginModal: boolean
    setLoginModal: Function
}

const ModalAuthorized = ({ loginModal, setLoginModal }: IModalAuthorized) => {
    const { openModal } = loginModalSlice.actions
    const { removeUser } = userSlice.actions
    const { changeProfileTab } = extraSlice.actions
    const { openSmModal, changeToFav, changeToProfile } = smModalSlice.actions
    const { isAuth } = useAuth()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const currentTargetRef = useRef(null)

    return (
        <div
            ref={currentTargetRef}
            className={!loginModal ? s.modal : `${s.modal} ${s.active}`}
            onClick={(e) => {
                if (e.target !== currentTargetRef.current) {
                    setLoginModal(false)
                }
            }}>
            <div className={s.modal__body}>
                <div className={s.modal__links}>
                    <div
                        className={s.modal__link}
                        onClick={() => {
                            if (isAuth) {
                                navigate('/profile')
                            } else {
                                dispatch(changeToProfile())
                                dispatch(openSmModal())
                            }
                        }}>
                        <IconSelector className={s.modal__ico} id='person' />
                        <span>Мой аккаунт</span>
                    </div>
                    <div
                        className={s.modal__link}
                        onClick={async () => {
                            if (isAuth) {
                                navigate('/profile')
                                dispatch(changeProfileTab('Список желаемого'))
                            } else {
                                dispatch(changeToFav())
                                dispatch(openSmModal())
                            }
                        }}>
                        <IconSelector className={s.modal__ico_heart} id='heart' />
                        <span>Список желаний</span>
                    </div>
                    {isAuth ?
                        <div
                            className={s.modal__link}
                            onClick={() => {
                                dispatch(removeUser())
                                setLoginModal(false)
                                window.location.reload()
                            }}>
                            <IconSelector className={s.modal__ico} id='logout' />
                            <span>Выйти</span>
                        </div> :
                        <div
                            className={s.modal__link}
                            onClick={() => {
                                dispatch(openModal())
                                setLoginModal(false)
                            }}>
                            <IconSelector className={s.modal__ico} id='logout' />
                            <span>Войти</span>
                        </div>}
                </div>
            </div>
        </div>
    )
}

const CartListModal = ({ cartModal, setCartModal }: any) => {
    const { _id } = useAuth()
    const { cartlist } = useAppSelector<any>(state => state.userReducer)
    const { changeCartlist } = userSlice.actions
    const { changeProfileTab } = extraSlice.actions
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [changeUserInfo] = authUser.useChangeUserInfoMutation()

    const fancyCartlist = () => {
        let id = ``
        cartlist.forEach((el: string) => {
            id = id + `&id=${el}`
        })
        return id
    }

    const filterCartlist = (id: string) => {
        dispatch(changeCartlist(cartlist.filter((el: string) => el !== id)))
        changeUserInfo({
            id: _id,
            body: {
                cartlist: [...cartlist, id]
            }
        })
    }

    const { data: cartProducts, isLoading, isFetching } = productApi.useGetAllProductsQuery({
        page: 1,
        limit: 5,
        emptyField: cartlist.length ? 'false' : 'true',
        params: fancyCartlist()
    })

    const renderCartList = () => {
        const renamedCondition = (condition: string) => {
            switch (condition) {
                case 'novaya_s_birkoy': return 'Новая с биркой'
                case 'novaya_bez_birki': return 'Новая без бирки'
                case 'nebolshie_defekti': return 'Небольшие дефекты'
                case 'nadevalas_odin_raz': return 'Надевалась один раз'
                case 'nadevalas_neskolko_raz': return 'Надевалась несколько раз'
            }
        }
        return (
            cartProducts?.products.map((el: any, i: number) => {
                return (
                    <div key={el._id}>
                        {i < 5 ? <div className={s.modalwish__item}>
                            <img src={el.mainPhoto} alt='img' />
                            <div className={s.modalwish__name}>
                                <h2>{el.name.slice(0, 15)}{el.name.length >= 16 ? "..." : ""}</h2>
                                <span>{renamedCondition(el.condition)}</span>
                            </div>
                            <h2>{el.size}</h2>
                            <div className={s.modalwish__price}>
                                <h2>{el.discount ? el.discount : el.price}</h2>
                                <IconSelector className={s.modalwish__uah} id='uah' />
                            </div>
                            <IconSelector
                                className={s.modalwish__remove}
                                id='close'
                                onClick={() => filterCartlist(el._id)} />
                        </div> : null}
                        {i < 5 ? <Line style={{ margin: '12px 0px' }} /> : null}
                    </div>
                )
            })
        )
    }

    return (
        <div className={cartModal ? `${s.modalwish} ${s.active}` : s.modalwish}>
            <div className={s.modalwish__body}>
                {isLoading || isFetching ? <IconSelector id='loader' /> :
                    <>
                        {cartProducts?.products.length ?
                            <>
                                {renderCartList()}
                                <div className={s.modalwish__buttons}>
                                    {cartProducts?.products.length >= 6 ? <div
                                        className={s.modalwish__full}
                                        onClick={() => {
                                            navigate('/profile')
                                            dispatch(changeProfileTab('Корзина'))
                                            setCartModal(false)
                                        }}>
                                        <span>+{(cartProducts?.products.length - 5)}</span>
                                    </div> : null}
                                    <div 
                                        className={s.modalwish__cart_link}
                                        onClick={() => {
                                            navigate('/ordering')
                                            setCartModal(false)
                                        }}>
                                        <IconSelector id='shoping-bag' />
                                    </div>
                                </div>
                            </> : <span className={s.modalwish__empty_cart}>Ваша корзина пустая</span>}
                    </>
                }
            </div>
        </div>
    )
}

export default function Header() {
    const { openSmModal, changeToSell } = smModalSlice.actions
    const dispatch = useAppDispatch()
    const [loginModal, setLoginModal] = useState(false)
    const [cartModal, setCartModal] = useState(false)
    const { isAuth, cartlist } = useAuth()
    const navigate = useNavigate()

    return (
        <nav className={s.header}>
            <div className={s.header + ' _container'}>
                <div className={s.header__body}>
                    <Link to='/'><IconSelector className={s.header__logo} id='logo' /></Link>
                    <div className={s.header__links}>
                        <Link to='/male'>
                            <h2>Мужское</h2>
                        </Link>
                        <Link to='/female'><h2>Женское</h2></Link>
                        <Link to='/unisex'><h2>Унисекс</h2></Link>
                        <Link to='/sale'><h2 style={{ color: 'var(--main-red)' }}>Sale</h2></Link>
                        <Link to='/faq'><h2>FAQ</h2></Link>
                        <Link to='/security'><h2>Безопасная сделка</h2></Link>
                        <Link to='/rules'><h2>Правила пользования</h2></Link>
                    </div>
                    <div className={s.header__actives}>
                        <div style={{ position: 'relative', height: '20px' }}>
                            <IconSelector
                                className={s.header__cart}
                                onClick={() => {
                                    setCartModal(!cartModal)
                                    setLoginModal(false)
                                }}
                                id='cart' />
                            {isAuth === true ?
                                <span className={s.header__counter}>
                                    {cartlist.length > 99 ? '99+' : cartlist.length}
                                </span> : <></>}
                            {isAuth === true ? <CartListModal
                                setCartModal={setCartModal}
                                cartModal={cartModal} /> : <></>}
                        </div>
                        <div style={{ height: '24px', position: 'relative' }}>
                            <IconSelector
                                className={s.header__person} id='person'
                                onClick={() => {
                                    setLoginModal(!loginModal)
                                    setCartModal(false)
                                }} />
                            <ModalAuthorized
                                loginModal={loginModal}
                                setLoginModal={setLoginModal} />
                        </div>
                        <Button
                            onClick={() => {
                                if (isAuth) {
                                    navigate('/sell')
                                } else {
                                    dispatch(changeToSell())
                                    dispatch(openSmModal())
                                }
                            }}
                            text='Продать'
                            className='header__button' />
                    </div>
                </div>
            </div>
        </nav>
    )
}