import React from 'react'
import styles from './Carousel.module.scss'
import { useState, useEffect, Children, cloneElement, useRef, useLayoutEffect } from 'react'
type ICarousel = {
    children: any;
}

export default function Carousel({ children }: ICarousel) {
    const [pages, setPages] = useState([])
    const [offset, setOffset] = useState(0)
    const carouselRef = useRef<HTMLDivElement>(null)
    const PAGE_WIDTH = 1140

    const handleLeftClick = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset + PAGE_WIDTH
            return newOffset
        })
    }

    const handleRightClick = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset - PAGE_WIDTH
            return newOffset
        })
    }

    useEffect(() => {
        setPages(Children.map(children, (child) => {
            return cloneElement(child, {
                style: {
                    height: '100%',
                    minWidth: `${PAGE_WIDTH}px`,
                    maxWidth: `${PAGE_WIDTH}px`,
                },
            })
        }))
    }, [])

    return (
        <div ref={carouselRef} className={styles.carousel}>
            <button className={styles.carousel__btn} onClick={handleLeftClick}>123</button>
            <div className={styles.carousel__window}>
                <div className={styles.carousel__container} style={{transition: 'transform 0.3s ease-in-out', transform: `translateX(${offset}px)` }}>
                    {pages}
                </div>
            </div>
            <button className={styles.carousel__btn_2} onClick={handleRightClick}>123</button>
        </div>
    )
}