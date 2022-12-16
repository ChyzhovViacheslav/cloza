import { useNavigate } from "react-router"
import IconSelector from "../../assets/icons/icons"
import { useAppDispatch } from "../../hooks/redux"
import useCartlist from "../../hooks/useCartlist"
import useAuth from "../../hooks/userAuth"
import ICartList from "../../models/ICartList"
import { authUser } from "../../services/AuthUser"
import { productApi } from "../../services/ProductService"
import { extraSlice } from "../../store/reducers/ExtraSlice"
import { userSlice } from "../../store/reducers/UserSlice"
import Line from "../interface/line/Line"
import s from './CartListModal.module.scss'

interface ICartListModal {
    cartModal: boolean,
    setCartModal: (value: boolean) => void
}

export default function CartListModal({ cartModal, setCartModal }: ICartListModal) {
    const { _id, cartlist } = useAuth()
    const { removeFromCartlist } = useCartlist()
    const { changeCartlist } = userSlice.actions
    const { changeProfileTab } = extraSlice.actions
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [changeUserInfo] = authUser.useChangeUserInfoMutation()

    const fancyCartlist = () => {
        let id = ``
        cartlist.forEach((el: ICartList) => {
            id = id + `&id=${el.id}`
        })
        return id
    }

    const incAmount = (id: string) => {
        const filtredCartlist = cartlist.filter((el: ICartList) => el.id !== id)
        const changedCartlist: ICartList[] = cartlist.filter((el: ICartList) => el.id === id)
        const newCartlist = [...filtredCartlist, {
            id: changedCartlist[0].id,
            amount: changedCartlist[0].amount + 1
        }]

        dispatch(changeCartlist(newCartlist))
        changeUserInfo({
            id: _id,
            body: {
                cartlist: newCartlist
            }
        })
    }

    const decAmount = (amount: number, id: string) => {
        if (amount === 1) {
            removeFromCartlist(_id, id)
        } else {
            const filtredCartlist = cartlist.filter((el: ICartList) => el.id !== id)
            const changedCartlist: ICartList[] = cartlist.filter((el: ICartList) => el.id === id)
            const newCartlist = [...filtredCartlist, {
                id: changedCartlist[0].id,
                amount: changedCartlist[0].amount - 1
            }]

            dispatch(changeCartlist(newCartlist))
            changeUserInfo({
                id: _id,
                body: {
                    cartlist: newCartlist
                }
            })
        }
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

        const currentCartlistAmount = (id: string) => {
            const currentAmount = cartlist.filter((el: ICartList) => el.id === id) as ICartList[]

            return currentAmount[0].amount
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
                            <div className={s.modalwish__amount}>
                                <IconSelector onClick={() => incAmount(el._id)} id='up' />
                                <span>{currentCartlistAmount(el._id)} шт.</span>
                                <IconSelector onClick={() => decAmount(currentCartlistAmount(el._id), el._id)} id='down' />
                            </div>
                            <h2>{el.size}</h2>
                            <div className={s.modalwish__price}>
                                <h2>{el.discount ? (el.discount * currentCartlistAmount(el._id)) : (el.price * currentCartlistAmount(el._id))}</h2>
                                <IconSelector className={s.modalwish__uah} id='uah' />
                            </div>
                            <IconSelector
                                className={s.modalwish__remove}
                                id='close'
                                onClick={() => removeFromCartlist(_id, el._id)} />
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
                        {cartlist.length ?
                            <>
                                {renderCartList()}
                                <div className={s.modalwish__buttons}>
                                    {cartlist.length > 5 ? <div
                                        className={s.modalwish__full}
                                        onClick={() => {
                                            navigate('/profile')
                                            dispatch(changeProfileTab('Корзина'))
                                            setCartModal(false)
                                        }}>
                                        <span>+{(cartlist.length - 5)}</span>
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