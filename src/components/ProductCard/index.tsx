/* eslint-disable max-len */
/**
 *
 * ProductCard
 *
 */
import React, { useState } from "react";
import { useRouter } from "next/router";
import ClassNames from "classnames";
// InterFaces
import { IProductCard } from "./ProductCard";
// svg
import Beds from "./svg/beds.svg";
import Fav from "./svg/favorite.svg";
import Reload from "./svg/reload.svg";
import Sqft from "./svg/sqft.svg";
import Bath from "./svg/bath.svg";
// styles
import styles from "./styles/ProductCard.module.scss";

export const ProductCard: React.FunctionComponent<IProductCard.IProps> = ({
  cardDetails,
  size,
  active
}) => {
  const [favorite, setFavorite] = useState(false);
  const favClass = ClassNames(favorite ? styles.favorite : styles.unfavorite);
  const router = useRouter();

  const getPrompt = label => {
    if (label == "Excellent") {
      return "We analyzed similar homes in this area and calculated that this home is priced lower than the average making it a Great Price.";
    } else if (label == "Fair") {
      return "We analyzed similar homes in this area and calculated that this home is priced just same as the average making it a Fair Price.";
    } else {
      return "We analyzed similar homes in this area and calculated that this home is priced higher than the average making it a Great Price.";
    }
  };

  return (
    <div className={active ? `${styles[`active`]}` : ""}>
      <div
        className={`${styles[`product-card-${size}`]}`}
        onClick={() => router.push("/detail/" + cardDetails.id)}
      >
        {/* favorite product */}
        <Fav className={favClass} onClick={() => setFavorite(!favorite)} />
        {/* favorite product */}

        {/* card overlay */}
        <div className={styles["card-overlay"]}>
          <div className={styles["overlay-details"]}>
            <h3 className="overlay-title">{cardDetails.label}</h3>
            <p className="overlay-text">{getPrompt(cardDetails.label)}</p>
            <p className="overlay-price">{cardDetails.priceDiff}</p>
          </div>
        </div>

        {/* card overlay */}
        {cardDetails.image ? (
          cardDetails.image.slice(0, 4) == "http" ? (
            <img src={cardDetails.image} alt="" />
          ) : (
            <img src={"http://localhost:5000" + cardDetails.image} alt="" />
          )
        ) : (
          <img src={"http://localhost:5000" + cardDetails.image} alt="" />
        )}

        <div className={styles["product-desc"]}>
          <div className="d-flex justify-content-between">
            <p className={styles.city}>{cardDetails.city}</p>
            <span className={styles.price}>{`$ ${cardDetails.price} `}</span>
          </div>
          <p className={styles.address}>{cardDetails.streetAddress}</p>

          <div
            className={`d-flex justify-content-between align-items-center ${styles["bottom-desc"]}`}
          >
            <div className={`d-flex ${styles["product-feature"]}`}>
              <span>
                <Sqft />
                {`${cardDetails.size} sqft`}
              </span>
              <span>
                <Beds />
                {cardDetails.bedroomCount}
                bed
              </span>
              <span>
                <Bath />
                {cardDetails.bathroomCount}
                bath
              </span>
            </div>
            <div className={styles["product-date"]}>
              <Reload className="mr-1" />
              <span>
                {Math.ceil(
                  Math.abs(
                    new Date(cardDetails.dateListed).getTime() -
                      new Date().getTime()
                  ) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                days ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
