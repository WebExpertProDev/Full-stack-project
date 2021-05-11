/**
 *
 * HouseCardList
 *
 */
import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import Link from "@Components/Link";
// import { Col, Row } from 'react-bootstrap';
import HouseCard from "../../../../components/ProductCard";
import styles from "./styles/HouseCard.module.scss";

// InterFaces
import { IHouseCardList } from "./HouseCardList";

// assets
// import cartImage from '../../../../../public/static/images/building.png';

// eslint-disable-next-line max-len

export const HouseCardList: React.FunctionComponent<IHouseCardList.IProps> = ({
  cartLayout,
  cardItems,
  currentItem
}) => (
  <>
    <div>
      <CSSTransitionGroup
        className={`d-flex ${
          cartLayout ? styles["housecard-row-map"] : styles["housecard-row"]
        }`}
        transitionName="example"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {cardItems.map((cardItem, index) => (
          <div
            key={cardItem._id}
            className={`${
              cartLayout ? styles.housecard : styles["house-card-mobile"]
            } `}
          >
            {currentItem == cardItem._id ? (
              <HouseCard
                key={index}
                cardDetails={{
                  id: cardItem._id,
                  image: cardItem.image[0],
                  city: cardItem.city,
                  streetAddress: cardItem.streetAddress,
                  price:
                    cardItem.historyPrice[cardItem.historyPrice.length - 1],
                  size: cardItem.overview.size,
                  bedroomCount: cardItem.overview.bedroomCount,
                  bathroomCount: cardItem.overview.bathroomCount,
                  dateListed: cardItem.dateListed,
                  label: "",
                  priceDiff: ""
                }}
                size="lg"
                active={true}
              />
            ) : (
              <HouseCard
                key={index}
                cardDetails={{
                  id: cardItem._id,
                  image: cardItem.image[0],
                  city: cardItem.city,
                  streetAddress: cardItem.streetAddress,
                  price:
                    cardItem.historyPrice[cardItem.historyPrice.length - 1],
                  size: cardItem.overview.size,
                  bedroomCount: cardItem.overview.bedroomCount,
                  bathroomCount: cardItem.overview.bathroomCount,
                  dateListed: cardItem.dateListed,
                  label: "",
                  priceDiff: ""
                }}
                size="lg"
                active={false}
              />
            )}
          </div>
        ))}
      </CSSTransitionGroup>
    </div>
  </>
);

export default HouseCardList;
