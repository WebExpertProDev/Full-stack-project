// import { useState } from "react"

// svg
// import Beds from "/static/icons/beds.svg"
// import Fav from "/static/icons/favorite.svg"
// import Reload from "/static/icons/reload.svg"
// import Sqft from "/static/icons/sqft.svg"
// import Bath from "/static/icons/bath.svg"
import Link from "next/link"
import styles from "./styles/ProductCard.module.scss"
import { SearchFilters } from "../../../styles/StyledComponents"
import Image from "next/image"
// import ClassNames from "classnames"

export const HouseCard = ({ cardItem, size, onDoubleClick }) => {
  // const [favorite, setFavorite] = useState(false)
  // const favClass = ClassNames(favorite ? styles.favorite : styles.unfavorite)

  return (
    <div className={`${styles[`product-card-${size}`]}`} onDoubleClick={(e) => onDoubleClick(e)}>
      {/* favorite product */}
      {/* <Fav className={favClass} onClick={() => setFavorite(!favorite)} /> */}
      {/* favorite product */}

      {/* card overlay */}
      <div className={styles["card-overlay"]}>
        <div className={styles["overlay-details"]}>
          <h3 className="overlay-title">Excellent</h3>
          <p className="overlay-text">
            We analyzed similar vehicles in your area and calculated that this vehicle is priced
            lower than the average making it a Great Price.
          </p>
          <p className="overlay-price">$9,407 BELOW M</p>
          <Link href={`/detail/${cardItem.id}`}>
            <SearchFilters className="cursor-pointer mt-5 font-black">See more</SearchFilters>
          </Link>
        </div>
      </div>

      {/* card overlay */}
      <img src={cardItem.img} alt="" />

      <div className={styles["product-desc"]}>
        <div className="d-flex justify-content-between">
          <p className={styles.city}>{cardItem.city}</p>
          <span className={styles.price}>{`$ ${cardItem.price} `}</span>
        </div>
        <p className={styles.address}>{cardItem.address}</p>

        <div className={`flex justify-between items-center ${styles["bottom-desc"]}`}>
          <div className={`flex ${styles["product-feature"]}`}>
            <span>
              <Image
                src="/static/icons/sqft.svg"
                layout="fixed"
                width="15"
                height="15"
                className="z-40"
              />
              <p> {`${cardItem.sqft} sqft`}</p>
            </span>
            <span>
              <Image
                src="/static/icons/bed.svg"
                layout="fixed"
                width="15"
                height="15"
                className="z-40"
              />
              {cardItem.bed}
              bd
            </span>
            <span>
              <Image
                src="/static/icons/bath.svg"
                layout="fixed"
                width="15"
                height="15"
                className="z-40"
              />
              {cardItem.bt}
              bt
            </span>
          </div>
          <div className="flex items-center">
            <Image src="/static/icons/reload.svg" layout="fixed" width="15" height="15" />
            <span>3 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HouseCard
