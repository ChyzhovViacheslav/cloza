import IconSelector from '../../assets/icons/icons';
import useAuth from '../../hooks/userAuth';
import s from './Profile.module.scss';
import { useState, useRef, useEffect } from 'react'
import Rating from '../../components/interface/rating/Rating';
import { extraApi } from '../../services/ExtraService';
import Line from '../../components/interface/line/Line';
import { productApi } from '../../services/ProductService';
import { useLocation } from 'react-router';
import ClothesCard from '../../components/clothesitem/ClothesCard';
import Pagination from '../../components/pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { extraSlice } from '../../store/reducers/ExtraSlice';
import DeliveryInfo from '../../components/deliveryinfo/deliveryinfo';
import IDeliveryInfo from '../../models/IDeliveryInfo';
import { authUser } from '../../services/AuthUser';
import { userSlice } from '../../store/reducers/UserSlice';
import ICartList from '../../models/ICartList';
import Button from '../../components/interface/button/Button';
import SuccessModal from '../../components/interface/successmodal/SuccessModal';
import WarningModal from '../../components/interface/warningmodal/WarningModal';

export default function Profile() {
    const { username, image, _id, email, wishlist, cartlist, delivery_info, registerDate } = useAuth()
    const location = useLocation()

    const { currentProfileTab } = useAppSelector(state => state.ExtraReducer)
    const { changeProfileTab } = extraSlice.actions
    const { changeDeliveryInfoList, changeUserName, changeUserPhoto } = userSlice.actions
    const dispatch = useAppDispatch()

    const refUsername = useRef<HTMLDivElement>(null)
    const [userName, setUserName] = useState(username)
    const [userPhoto, setUserPhoto] = useState<string>(image)
    const [contentEditable, setContentEditable] = useState(false)

    const [modalIsActive, setModalIsActive] = useState(false)
    const [warnIsActive, setWarnIsActive] = useState(false)

    const [templateName, setTemplateName] = useState('')
    const [templateEmail, setTemplateEmail] = useState('')
    const [templatePhone, setTemplatePhone] = useState('') as any
    const [templateCity, setTemplateCity] = useState('')
    const [templateAddress, setTemplateAddress] = useState('')
    const [templateIndex, setTemplateIndex] = useState('') as any

    const [changeUserInfo, { isLoading }] = authUser.useChangeUserInfoMutation()
    const [createOrder] = extraApi.useCreateOrderMutation()

    const [currentProductPage, setCurrentProductPage] = useState(1)
    const [currentWishListPage, setCurrentWishListPage] = useState(1)
    const [currentCartlistPage, setCurrentCartlistPage] = useState(1)

    const fancyUrl = () => {
        if (location.search) {
            const splicedLocation = location.search.replace('?', '').split('/')
            const equalSpliced = splicedLocation.map((el: any) => el.split('='))
            const comaSpliced = equalSpliced.map((el: any) => [el[0], el[1].split(',')])
            const joinedArrs = comaSpliced.map((el: any) => `${el[0]}[]=${el[1].join(`&${el[0]}[]=`)}`)
            return joinedArrs.join('&')
        } else return ''
    }

    const fancyWishlist = () => {
        let id = ``
        wishlist.forEach((el: string) => {
            id = id + `&id=${el}`
        })
        return id
    }

    const fancyCartlist = () => {
        let id = ``
        cartlist.forEach((el: ICartList) => {
            id = id + `&id=${el.id}`
        })
        return id
    }

    const currentDate = new Date().toLocaleString("ru", {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Europe/Kiev',
    })

    const createOrderHandler = async (paymentType: string, deliveryType: string, costOfDelivery: number, costOfAllProducts: number, comment: string) => {
        const products = cartlist.map((el) => {
            return { productId: el, amount: 1 }
        })

        await createOrder({
            address: templateAddress,
            name: templateName,
            phone: templatePhone,
            city: templateCity,
            index: templateIndex,
            products: products,
            orderTime: currentDate,
            email: email,
            paymentType: paymentType,
            deliveryType: deliveryType,
            costOfDelivery: costOfDelivery,
            costOfAllProducts: costOfAllProducts,
            comment: comment,
            delivered: false,
            paid: false
        })
    }

    const { data: reviews } = extraApi.useGetAllReviewQuery({
        page: 1,
        limit: 10,
        userId: _id
    })

    const { data: products } = productApi.useGetAllProductsQuery({
        page: currentProductPage,
        limit: 15,
        email: email,
        params: fancyUrl()
    })

    const { data: wishlistProducts } = productApi.useGetAllProductsQuery({
        page: currentWishListPage,
        limit: 16,
        emptyField: wishlist.length ? 'false' : 'true',
        params: fancyWishlist()
    })

    const { data: cartlistProducts } = productApi.useGetAllProductsQuery({
        page: currentCartlistPage,
        limit: 16,
        emptyField: cartlist.length ? 'false' : 'true',
        params: fancyCartlist()
    })

    useEffect(() => {
        setUserName(refUsername.current.textContent)
    }, [])

    useEffect(() => {

    }, [changeProfileTab])

    const renderTabs = () => {
        const tabs = ['Ваши товары', 'Список желаемого', 'Корзина', 'Данные для доставки']
        return (
            tabs.map((el: string, i: number) => {
                return (
                    <div
                        className={currentProfileTab === el ? `${s.profile__tabs_btn} ${s.active}` : s.profile__tabs_btn}
                        key={i}
                        onClick={() => {
                            dispatch(changeProfileTab(el))
                        }}>
                        <span>{el}</span>
                    </div>
                )
            })
        )
    }

    const renderCurrentTab = () => {
        switch (currentProfileTab) {
            case 'Ваши товары': return (
                <div className={s.profile__products}>
                    <div className={s.profile__products_body}>
                        {cartlist?.length >= 1 ?
                            <>
                                <div className={s.profile__products_content}>
                                    {renderProducts()}
                                </div>
                                <Pagination
                                    currentPage={currentProductPage}
                                    setCurrentPage={setCurrentProductPage}
                                    totalPages={products?.totalPages} />
                            </>
                            :
                            <div className={s.profile__wishlist_empty}>
                                <IconSelector id='search' />
                                <span>Ваш список пуст</span>
                            </div>}
                    </div>
                </div>
            )
            case 'Список желаемого': return (
                <div className={s.profile__wishlist}>
                    <div className={s.profile__wishlist_body}>
                        {wishlist.length ? <>
                            <div className={s.profile__wishlist_content}>
                                {renderWishlist()}
                            </div>
                            <Pagination
                                currentPage={currentWishListPage}
                                setCurrentPage={setCurrentWishListPage}
                                totalPages={wishlistProducts?.totalPages} />
                        </>
                            :
                            <div className={s.profile__wishlist_empty}>
                                <IconSelector id='search' />
                                <span>Ваш список пуст</span>
                            </div>}
                    </div>
                </div>
            )
            case 'Корзина': return (
                <div className={s.profile__cartlist}>
                    <div className={s.profile__cartlist_body}>
                        {cartlist.length ?
                            <>
                                <div className={s.profile__cartlist_content}>
                                    {renderCartlist()}
                                </div>
                                <Pagination
                                    currentPage={currentCartlistPage}
                                    setCurrentPage={setCurrentCartlistPage}
                                    totalPages={cartlistProducts?.totalPages} />
                            </>
                            :
                            <div className={s.profile__cartlist_empty}>
                                <IconSelector id='search' />
                                <span>Ваш список пуст</span>
                            </div>}
                    </div>
                </div>
            )
            case 'Данные для доставки': return (
                <div className={s.profile__delivery_info}>
                    <div className={s.profile__delivery_info_body}>
                        <DeliveryInfo
                            name={templateName}
                            address={templateAddress}
                            city={templateCity}
                            email={templateEmail}
                            index={templateIndex}
                            phone={templatePhone}
                            createOrderHandler={createOrderHandler}
                            setAddress={setTemplateAddress}
                            setCity={setTemplateCity}
                            setEmail={setTemplateEmail}
                            setIndex={setTemplateIndex}
                            setName={setTemplateName}
                            setPhone={setTemplatePhone}
                            setSuccessModalIsActive={setModalIsActive}
                            setTemplateWarnIsActive={setWarnIsActive}
                            isTemplate={true} />
                        <div className={s.profile__templates}>
                            <h5>Ваши шаблоны</h5>
                            <div className={s.profile__templates_body}>
                                {renderTemplates()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const renderTemplates = () => {
        const deleteCurrentTemplate = (id: any) => {
            const filtredTemplate = delivery_info.filter((el: IDeliveryInfo) => el.id !== id)

            dispatch(changeDeliveryInfoList(filtredTemplate))
            changeUserInfo({
                id: _id,
                body: {
                    delivery_info: filtredTemplate
                }
            })
        }

        return (
            delivery_info.map((el: IDeliveryInfo, i: number) => {
                return (
                    <div
                        key={el.id}
                        className={s.profile__templates_item}>
                        <label><h2>ФИО:</h2><span>{el.name}</span></label>
                        <label><h2>Номер телефона:</h2><span>{el.phone}</span></label>
                        <label><h2>Email:</h2><span>{el.email}</span></label>
                        <label><h2>Город:</h2><span>{el.city}</span></label>
                        <label><h2>Адрес:</h2><span>{el.address}</span></label>
                        <label><h2>Индекс:</h2><span>{el.index}</span></label>
                        <div className={s.profile__templates_btns}>
                            <IconSelector
                                onClick={() => deleteCurrentTemplate(el.id)}
                                id='close' />
                        </div>
                    </div>
                )
            })
        )
    }

    const renderProducts = () => {
        return (
            products?.products.map((el: any) => {
                return <ClothesCard
                    key={el._id}
                    saler={el.saler}
                    name={el.name}
                    condition={el.condition}
                    mainCategory={el.mainCategory}
                    category={el.category}
                    subCategory={el.subCategory}
                    brand={el.brand}
                    size={el.size}
                    color={el.color}
                    description={el.description}
                    discount={el.discount}
                    price={el.price}
                    amount={el.amount}
                    trade={el.trade}
                    _id={el._id}
                    mainPhoto={el.mainPhoto}
                    additionalsPhotos={el.additionalsPhotos} />
            })
        )
    }

    const renderWishlist = () => {
        return (
            wishlistProducts?.products.map((el: any) => {
                return <ClothesCard
                    key={el._id}
                    saler={el.saler}
                    name={el.name}
                    condition={el.condition}
                    mainCategory={el.mainCategory}
                    category={el.category}
                    subCategory={el.subCategory}
                    brand={el.brand}
                    size={el.size}
                    color={el.color}
                    description={el.description}
                    discount={el.discount}
                    price={el.price}
                    amount={el.amount}
                    trade={el.trade}
                    _id={el._id}
                    mainPhoto={el.mainPhoto}
                    additionalsPhotos={el.additionalsPhotos} />
            })
        )
    }

    const renderCartlist = () => {
        return (
            cartlistProducts?.products.map((el: any) => {
                return <ClothesCard
                    key={el._id}
                    saler={el.saler}
                    name={el.name}
                    condition={el.condition}
                    mainCategory={el.mainCategory}
                    category={el.category}
                    subCategory={el.subCategory}
                    brand={el.brand}
                    size={el.size}
                    color={el.color}
                    description={el.description}
                    discount={el.discount}
                    price={el.price}
                    amount={el.amount}
                    trade={el.trade}
                    _id={el._id}
                    mainPhoto={el.mainPhoto}
                    additionalsPhotos={el.additionalsPhotos} />
            })
        )
    }

    const toBase64 = (file: File): Promise<string> => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.onerror = error => reject(error);
    })

    return (
        <div className={s.profile}>
            <div className={s.profile__body}>
                <div className={s.profile__title}>
                    <h1>Ваш профиль</h1>
                </div>
                <div className={s.profile__info}>
                    <div className={s.profile__main_info}>
                        <div className={s.profile__img}>
                            <img alt='img' src={`data:image/png;base64,${userPhoto}`} />
                            <label
                                className={s.profile__img_btn}>
                                <input
                                    type='file'
                                    accept="image/png, image/jpeg, image/jpg"
                                    style={{ display: 'none' }}
                                    onChange={async (e) => {
                                        setUserPhoto((await toBase64(e.target.files[0])).split(',')[1])
                                    }} />
                                <IconSelector id='change-img' />
                            </label>
                        </div>
                        <div className={s.profile__content}>
                            <div className={s.profile__name}>
                                <h5
                                    ref={refUsername}
                                    contentEditable={contentEditable}
                                    suppressContentEditableWarning={true}>
                                    {userName}
                                </h5>
                                <IconSelector onClick={() => {
                                    if (contentEditable === false) {
                                        setContentEditable(true)
                                    } else {
                                        setUserName(refUsername.current.textContent)
                                        setContentEditable(false)
                                    }
                                }} id='change-text' />
                            </div>
                            <div className={s.profile__date}>
                                <span>Дата регистрации: {registerDate}</span>
                            </div>
                            <div className={s.profile__rating}>
                                <div>
                                    <span>Ваш рейтинг:</span>
                                    <Rating reviews={reviews?.reviews} />
                                </div>
                            </div>
                            <Button
                                className={s.profile__save}
                                text='Сохранить'
                                id={isLoading ? 'second-loader' : ''}
                                onClick={async () => {
                                    dispatch(changeUserName(userName))
                                    dispatch(changeUserPhoto(userPhoto))
                                    await changeUserInfo({
                                        id: _id,
                                        body: {
                                            image: userPhoto,
                                            username: userName
                                        }
                                    })
                                }} />
                        </div>
                    </div>
                </div>
                <div className={s.profile__tabs}>
                    <div className={s.profile__tabs_body}>
                        {renderTabs()}
                        <Line style={{ position: 'absolute', bottom: '0', zIndex: '1' }} />
                    </div>
                </div>
                {renderCurrentTab()}
            </div>
            <SuccessModal
                successText='Шаблон создан'
                setModalIsActive={setModalIsActive}
                modalIsActive={modalIsActive} />
            <WarningModal
                warnText='Заполните все поля'
                modalIsActive={warnIsActive}
                setModalIsActive={setWarnIsActive} />
        </div>
    )
}