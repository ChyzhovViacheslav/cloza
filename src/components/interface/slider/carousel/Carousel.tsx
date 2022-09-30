import React from 'react'
import styles from './Carousel.module.scss'
import { useState, useEffect, Children, cloneElement, useRef, useLayoutEffect } from 'react'
import IconSelector from '../../../../assets/icons/icons';
type ICarousel = {
    children?: any;
    readonly carouselRef?: HTMLDivElement;
}

export default function Carousel({ children }: ICarousel) {
    const [pages, setPages] = useState([])
    const [offset, setOffset] = useState(0)
    const ref = useRef([])
    const carouselRef = useRef<HTMLDivElement>(null)
    const PAGE_WIDTH = 1140
    const [dot, setDot] = useState(0)

    const handleLeftClick = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset + PAGE_WIDTH

            if (newOffset !== PAGE_WIDTH) {
                return Math.min(newOffset, 0)
            } else {
                const maxOffset = -(PAGE_WIDTH * (pages.length - 1))
                return Math.max(maxOffset)
            }
        })
        setDot((current) => {
            if(current === 0){
                return 3
            } else {
                return dot - 1
            }
        })
    }

    const handleRightClick = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset - PAGE_WIDTH
            const maxOffset = -(PAGE_WIDTH * (pages.length - 1))
            if (newOffset === -(PAGE_WIDTH * pages.length)) {
                return 0
            } else {
                return Math.max(newOffset, maxOffset)
            }
        })
        setDot((current) => {
            if(current === 3){
                return 0
            } else {
                return dot + 1
            }
        })
    }

    const handlerDotsClick = (index: number) => {
        setOffset((currentOffset) => {
            const newOffset = -(PAGE_WIDTH * index)
            return newOffset
        })
    }
    
    const dots = pages.map((el, index) => {
        return(
            <div style={dot === index ? {backgroundColor: "black"} : null} ref={el => ref.current[index] = el} key={index} onClick={(e) => {
                setDot(index)
                handlerDotsClick(index)}} className={styles.carousel__dots}> 
            </div>
        )
    })

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
    }, [PAGE_WIDTH])

    return (
        <div ref={carouselRef} className={styles.carousel}>
            <button className={styles.carousel__btn_left} onClick={handleLeftClick}>
                <IconSelector id='arrowLeft' className={styles.carousel__btn_ico} />
            </button>
            <div className={styles.carousel__window}>
                <div className={styles.carousel__container} style={{ transition: 'transform 0.3s ease-in-out', transform: `translateX(${offset}px)` }}>
                    {pages}
                </div>
                <div className={styles.carousel__dots_wrapper}>
                    {dots}
                </div>
            </div>
            <button className={styles.carousel__btn_right} onClick={handleRightClick}>
                <IconSelector id='arrowRight' className={styles.carousel__btn_ico} />
            </button>
        </div>
    )
}