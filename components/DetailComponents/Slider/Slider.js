/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation } from "swiper"
import useWindowSize from "../../../hooks/useWindowSize"
import styles from "./slider.module.css"
import Lightbox from "react-image-lightbox"

SwiperCore.use([Navigation])
export const Slider = () => {
  const size = useWindowSize()

  const [isOpen, setIsOpen] = useState(false)
  const [photoSelect, setPhotoSelect] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)

  const images = [
    "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1459535653751-d571815e906b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1522050212171-61b01dd24579?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1503174971373-b1f69850bded?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1459535653751-d571815e906b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  ]

  return (
    <>
      <div className={styles.carousel}>
        <img
          className={styles.arrow}
          onClick={() => setIsOpen(!isOpen)}
          src="/static/icons/arrow-3.svg"
        />
        <Swiper spaceBetween={0} slidesPerView={size > 600 ? 3 : 1} navigation autoplay>
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt=""
                className={styles["img-slider"]}
                onClick={() => setPhotoSelect(true)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {photoSelect && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setPhotoSelect(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((prev) => (prev + images.length - 1) % images.length)
          }
          onMoveNextRequest={() => setPhotoIndex((prev) => (prev + 1) % images.length)}
        />
      )}
    </>
  )
}

export default Slider
