import IconSelector from '../../assets/icons/icons';
import useAuth from '../../hooks/userAuth';
import s from '../../styles/styleComponents/Profile.module.scss';
import { useState, useRef, useEffect } from 'react'
import Rating from '../../components/interface/rating/Rating';
import { extraApi } from '../../services/ExtraService';
import Line from '../../components/interface/line/Line';
import Filter from '../../components/filter/Filter';
import { productApi } from '../../services/ProductService';
import { useLocation } from 'react-router';
import ClothesCard from '../../components/clothesitem/ClothesCard';
import Pagination from '../../components/pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { extraSlice } from '../../store/reducers/ExtraSlice';

export default function Profile() {
    const { username, image, _id, email, wishlist, cartlist } = useAuth()
    const location = useLocation()

    const { currentProfileTab } = useAppSelector(state => state.ExtraReducer)
    const { changeProfileTab } = extraSlice.actions
    const dispatch = useAppDispatch()

    const refUsername = useRef<HTMLDivElement>(null)
    const [userName, setUserName] = useState(username)
    const [userPhoto, setUserPhoto] = useState(image)
    const [contentEditable, setContentEditable] = useState(false)

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
        cartlist.forEach((el: string) => {
            id = id + `&id=${el}`
        })
        return id
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
        const tabs = ['Ваши товары', 'Список желаемого', 'Корзина']
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
                        <div className={s.profile__products_content}>
                            {renderProducts()}
                        </div>
                        <Pagination
                            currentPage={currentProductPage}
                            setCurrentPage={setCurrentProductPage}
                            totalPages={products?.totalPages} />
                    </div>
                    <Filter />
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
        }
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
                    id={el._id}
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
                    id={el._id}
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
                    id={el._id}
                    mainPhoto={el.mainPhoto}
                    additionalsPhotos={el.additionalsPhotos} />
            })
        )
    }

    return (
        <div className={s.profile}>
            <div className={s.profile__body}>
                <div className={s.profile__title}>
                    <h1>Ваш профиль</h1>
                </div>
                <div className={s.profile__info}>
                    <div className={s.profile__main_info}>
                        <div className={s.profile__img}>
                            <img alt='img' src={`data:image/png;base64,${image}`} />
                            <div className={s.profile__img_btn}>
                                <IconSelector id='change-img' />
                            </div>
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
                                        setContentEditable(false)
                                    }
                                }} id='change-text' />
                            </div>
                            <div className={s.profile__date}>
                                <span>Дата регистрации: 11.09.2022</span>
                            </div>
                            <div className={s.profile__rating}>
                                <span>Ваш рейтинг:</span>
                                <Rating reviews={reviews?.reviews} />
                            </div>
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
        </div>
    )
}