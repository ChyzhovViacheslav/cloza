import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router'
import IconSelector from '../../assets/icons/icons'
import ClothesCard from '../../components/clothesitem/ClothesCard'
import Filter from '../../components/filter/Filter'
import MySelect from '../../components/interface/inputs/MySelect'
import Line from '../../components/interface/line/Line'
import Reviews from '../../components/reviews/Reviews'
import UserCard from '../../components/usercard/UserCard'
import IReview from '../../models/IReview'
import { authUser } from '../../services/AuthUser'
import { extraApi } from '../../services/ExtraService'
import { productApi } from '../../services/ProductService'
import s from '../../styles/styleComponents/SalerPage.module.scss'

export default function SalerPage() {
    const { id } = useParams()
    const location = useLocation()

    const [sortByRating, setSortByRating] = useState(0)

    const { data: user, isLoading: userIsLoading } = authUser.useFetchOneUserByIdQuery(id)
    const { data: reviews, isLoading: reviewsIsLoading } = extraApi.useGetAllReviewQuery({
        page: 1,
        limit: 999,
        userId: id,
        params: ''
    })

    const [currentTab, setCurrentTab] = useState('Товары продавца')
    const [sortByPrice, setSortByPrice] = useState(1)
    const tabs = ['Товары продавца', 'Отзывы']

    const fancyUrl = () => {
        if (location.search) {
            const splicedLocation = location.search.replace('?', '').split('/')
            const equalSpliced = splicedLocation.map((el: any) => el.split('='))
            const comaSpliced = equalSpliced.map((el: any) => [el[0], el[1].split(',')])
            const joinedArrs = comaSpliced.map((el: any) => `${el[0]}[]=${el[1].join(`&${el[0]}[]=`)}`)
            return joinedArrs.join('&')
        } else return ''
    }

    const { data: products, isLoading: productIsLoading, isFetching: productsIsFetching } = productApi.useGetAllProductsQuery({
        page: 1,
        limit: 15,
        email: user?.email,
        sortByPrice: sortByPrice,
        params: fancyUrl()
    })

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

    const renderTabs = () => {
        return (
            tabs.map((el: string, i: any) => {
                return (
                    <div
                        className={currentTab === el ? `${s.saler__tabs_btn} ${s.active}` : s.saler__tabs_btn}
                        key={i}
                        onClick={() => {
                            setCurrentTab(el)
                        }}>
                        <span>{el}</span>
                    </div>
                )
            })
        )
    }

    const renderReviews = () => {
        return (
            reviews?.map((el: IReview, i: number) => {
                return (
                    <Reviews
                        reviewRating={el.rating}
                        reviewTime={el.time}
                        userId={el.reviewerId}
                        reviewDescription={el.description}
                        key={i}
                        productKey={i} />
                )
            })
        )
    }

    return (
        <div className={s.saler}>
            <div className={s.saler__body}>
                <div className={s.saler__saler}>
                    <UserCard
                        imageSize='96px'
                        salerImage={user?.image}
                        salerName={user?.username}
                        salerLoading={productIsLoading}
                        salerVotes={user?.votes}
                        salerRating={user?.rating}
                        productsLength={products?.totalProducts}
                        reviews={reviews}/>
                </div>
                <div className={s.saler__tabs}>
                    <div className={s.saler__tabs_body}>
                        {renderTabs()}
                        <Line style={{ position: 'absolute', bottom: '0', zIndex: '1' }} />
                    </div>
                </div>
                {currentTab === 'Товары продавца' ?
                    <div className={s.saler__products}>
                        <div style={{ width: '100%' }}>
                            <div className={s.saler__sort_action}>
                                <span>Сортировать:</span>
                                <MySelect
                                    data={["Новые предложения", "Цена по возрастанию", "Цена по убыванию"]}
                                    onChange={(e) => {
                                        switch (e.target.value) {
                                            case 'Цена по возрастанию': setSortByPrice(1)
                                                break;
                                            case 'Цена по убыванию': setSortByPrice(-1)
                                                break;
                                            default: setSortByPrice(0);
                                        }
                                    }}
                                    defaultValue={"Рекомендации"} />
                            </div>
                            <div className={s.saler__products_area}>
                                {productIsLoading || productsIsFetching ? <IconSelector className={s.saler__loader} id='loader' /> : renderProducts()}
                            </div>
                        </div>
                        <div className={s.saler__products_filter}>
                            <Filter />
                        </div>
                    </div> :
                    <div className={s.saler__reviews}>
                        <div className={s.saler__sort_review}>
                            <span>Сортировать:</span>
                            <MySelect
                                data={["По высокому рейтингу", "По низкому рейтингу"]}
                                onChange={(e) => {
                                    switch (e.target.value) {
                                        case 'По высокому рейтингу': setSortByRating(1)
                                            break;
                                        case 'По низкому рейтингу': setSortByRating(-1)
                                            break;
                                        default: setSortByRating(0);
                                    }
                                }}
                                defaultValue={"По дате"} />
                        </div>
                        <div className={s.saler__reviews_body}>
                            {renderReviews()}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}