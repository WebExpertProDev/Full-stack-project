/**
 *
 * Overview
 *
 */
import useWindowSize from "@Services/hooks/useWindowSize";

import React, { useState } from "react";
// import MediaQuery from "react-responsive"
// components
import Button from "@Components/Button";
import CheckoutForm from "@Components/Checkout/CheckoutForm";

// styles
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles/Overview.module.scss";

// assets
import Path from "./svg/path.svg";
import Starr from "./svg/star.svg";
import Share from "./svg/share.svg";
import Fav from "./svg/fav.svg";
import { useRouter } from "next/router";
// InterFaces
import { IOverview } from "./Overview";

export const Overview: React.FunctionComponent<IOverview.IProps> = ({
  detail
}) => {
  // detail.overview = {}; // remove this!!!
  // detail.historyPrice = [1,2,3]; // remove this!!!
  const overview = {
    openHouseDate: detail.openHouseDate,
    streetAddress: detail.streetAddress,
    city: detail.city,
    province: detail.province,
    postalCode: detail.postalCode,
    price: detail.historyPrice[0],
    rentPerUnit: detail.rentPerUnit,
    rentPerTime: detail.rentPerTime
  };
  let priceTag = "";
  [
    overview.price.toString(),
    overview.rentPerUnit,
    overview.rentPerTime
  ].forEach(item => {
    if (item) {
      priceTag += item + " · ";
    }
  });
  priceTag = priceTag.slice(0, -3);
  const size = useWindowSize();
  const address =
    overview.city +
    ", " +
    overview.province +
    " " +
    overview.postalCode +
    " - " +
    overview.streetAddress;
  const [copyState, setCopyState] = useState<string>("Copy Share Link");

  const copyLink = () => {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = window.location.href;
    console.log(dummy.value);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    setCopyState("Copied!");
    setTimeout(() => setCopyState("Copy Share Link"), 1000);
  };
  //please separate complete address and street address

  const router = useRouter();
  const BookTour = () => {
    localStorage.setItem("HomeAddress", overview.streetAddress);
    localStorage.setItem("PostalCode", overview.postalCode);
    localStorage.setItem("Provience", overview.province);
    localStorage.setItem("City", overview.city);
    localStorage.setItem("OpenHouseDate", overview.openHouseDate);
    router.push("/request-tour");
    return;
  };
  const SendOffer = () => {
    window.localStorage.setItem("detail", JSON.stringify(detail));
    if (detail.forRent) {
      router.push("/send-an-offer");
    } else {
      router.push("/send-sell-offer");
    }
    return;
  };
  return (
    <>
      <section
        id="overview"
        className={`py-2 ${styles["overview-title-section"]}`}
      >
        <Container fluid="lg" className="p-lg-0">
          <div className="d-flex aling-items-center">
            <Path />
            <span className={`pt-2 ml-2 ${styles.title}`}>{address}</span>
          </div>
        </Container>
      </section>

      {size < 714 ? (
        <div>
          <div className={styles["mobile-total-price"]}>
            <span className={styles.title}>Total Price</span>
            <span className={styles.price}>${overview.price} </span>
            <div className={`d-flex align-items-center ${styles.status}`}>
              <Starr />
              <span className="pl-2">Fair Price</span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <section className={styles["overview-section"]}>
        <Container fluid="lg" className="p-lg-0 ">
          <Row className="d-flex align-items-center">
            <Col
              lg="8"
              md="10"
              sm="12"
              className={`d-flex flex-wrap justify-content-lg-start justify-content-center mx-auto ${styles["btn-group"]}`}
            >
              <div className={styles["share-btn"]}>
                <Button
                  theme="outline-gray"
                  size="md"
                  height="48px"
                  font="15px"
                  fontFamily="Regular"
                  hasIcon={<Share />}
                  handleClick={copyLink}
                >
                  {copyState}
                </Button>
              </div>
              <div className={styles["favorite-btn"]}>
                <Button
                  theme="outline-gray"
                  size="md"
                  height="48px"
                  font="15px"
                  fontFamily="Regular"
                  hasIcon={<Fav />}
                >
                  Add to Favorites
                </Button>
              </div>

              <div className={styles["schedule-btn"]}>
                <Button
                  theme="primary"
                  size="md"
                  height="50px"
                  font="17px"
                  fontFamily="SemiBoldFont"
                  handleClick={BookTour}
                >
                  Schedule a Tour
                </Button>
              </div>
            </Col>

            <Col
              lg="4"
              md="12"
              className="d-flex justify-content-lg-end justify-content-center mt-4 mt-lg-0"
            >
              <div className={styles["total-price"]}>
                <span className={styles.title}>Total Price</span>
                <span className={styles.price}>${priceTag} </span>
                <div className={`d-flex align-items-center ${styles.status}`}>
                  <Starr />
                  <span className="pl-2">Fair Price</span>
                </div>
              </div>

              <div className={styles["schedule-btn"]}>
                <Button
                  theme="primary"
                  size="md"
                  height="50px"
                  font="17px"
                  fontFamily="SemiBoldFont"
                  handleClick={SendOffer}
                >
                  Send an Offer
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Overview;
