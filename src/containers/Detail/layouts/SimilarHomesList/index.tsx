/**
 *
 * SimilarHomesList
 *
 */
import React from "react";
import { useRouter } from "next/router";

// styles
import { Container, Row, Col } from "react-bootstrap";

// components
import HouseCard from "@Components/ProductCard";
import Link from "@Components/Link";
import styles from "./styles/SimilarHomeList.module.scss";

// InterFaces
import { ISimilarHomesList } from "./SimilarHomesList";

export const SimilarHomesList: React.FunctionComponent<ISimilarHomesList.IProps> = ({
  similarHomes
}) => {
  const getLabel = cardItem => {
    const priceDiff =
      parseInt(cardItem.historyPrice[0], 10) -
      parseInt(similarHomes.avgPrice, 10);
    if (priceDiff > 350) {
      return "Above market price";
    } else if (priceDiff > 200) {
      return "Fair";
    } else {
      return "Excellent";
    }
  };

  const getDiff = cardItem => {
    const priceDiff =
      parseInt(cardItem.historyPrice[0], 10) -
      parseInt(similarHomes.avgPrice, 10);
    console.log(parseInt(similarHomes.avgPrice, 10));
    if (priceDiff > 350) {
      return "$" + priceDiff.toString() + " Above AVERAGE";
    } else if (priceDiff > 200) {
      return "$" + priceDiff.toString() + " Above AVERAGE";
    } else {
      if (priceDiff > 0) {
        return "$" + priceDiff.toString() + " Above AVERAGE";
      }
      return (
        "$" +
        (priceDiff == 0 ? "0" : priceDiff.toString().slice(1)) +
        " Below AVERAGE"
      );
    }
  };

  return (
    <section id="similarHomes" className={styles["homelist-section"]}>
      <Container fluid="lg" className="p-lg-0">
        <Row>
          <Col lg={12} sm="10">
            <div className={`justify-content-start ${styles.title}`}>
              <div className={styles.circle} />
              <p>Similar homes </p>
            </div>
          </Col>
          {similarHomes.similar.length == 0 ? (
            <p>Sorry, no home found.</p>
          ) : (
            similarHomes.similar.map((cardItem, index) => (
              <Col
                key={index}
                lg="4"
                md="6"
                sm="12"
                xs="12"
                className=" mt-4 mt-lg-0 d-flex justify-content-center"
              >
                <HouseCard
                  active={false}
                  cardDetails={{
                    id: cardItem._id,
                    image: cardItem.image[0],
                    city: cardItem.city,
                    streetAddress: cardItem.streetAddress,
                    price: cardItem.historyPrice[0],
                    size: cardItem.overview.size,
                    bedroomCount: cardItem.overview.bedroomCount,
                    bathroomCount: cardItem.overview.bathroomCount,
                    dateListed: cardItem.dateListed,
                    label: getLabel(cardItem),
                    priceDiff: getDiff(cardItem)
                  }}
                  size="lg"
                />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </section>
  );
};

export default SimilarHomesList;
