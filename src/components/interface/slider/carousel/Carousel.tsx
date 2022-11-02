import React from 'react'
import s from './Carousel.module.scss'
import { useState, useEffect, Children, cloneElement, useRef } from 'react'
import IconSelector from '../../../../assets/icons/icons';
type ICarousel = {
    children?: any;
}

export default function Carousel({ children }: ICarousel) {
    const [pages, setPages] = useState([])
    const [offset, setOffset] = useState(0)
    const ref = useRef([])
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
                return ref.current.length - 1
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
            if(current === ref.current.length - 1){
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
            <div className={dot === index ? s.carousel__dots_active : s.carousel__dots} ref={el => ref.current[index] = el} key={index} onClick={(e) => {
                setDot(index)
                handlerDotsClick(index)}}> 
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
        <div className={s.carousel}>
            <button className={s.carousel__btn_left} onClick={handleLeftClick}>
                <IconSelector id='arrowLeft' className={s.carousel__btn_ico} />
            </button>
            <div className={s.carousel__window}>
                <div className={s.carousel__container} style={{ transition: 'transform 0.3s ease-in-out', transform: `translateX(${offset}px)` }}>
                    {pages}
                </div>
                <div className={s.carousel__dots_wrapper}>
                    {dots}
                </div>
            </div>
            <button className={s.carousel__btn_right} onClick={handleRightClick}>
                <IconSelector id='arrowRight' className={s.carousel__btn_ico} />
            </button>
        </div>
    )
}