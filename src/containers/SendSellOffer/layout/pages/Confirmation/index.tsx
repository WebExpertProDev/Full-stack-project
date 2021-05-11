/**
 *
 * NewOfferDate
 *
 */
import React, { useState } from "react";

// InterFaces
// components
import { Container, Row, Col } from "react-bootstrap";
import Button from "@Components/Button";
import DatePicker from "react-datepicker";
import Link from "@Components/Link";
import RadioButton from "@Components/RadioButton";
import { IConfirmation } from "./Confirmation";
import { useRouter } from "next/router";
// styles
import styles from "./styles/OfferDate.module.scss";

// assets
import Path from "./svg/path.svg";
import Cancel from "./svg/cancel.svg";
import CartImg from "./svg/image.png";
import Home from "./svg/home.svg";
import Pin from "./svg/pin.svg";
import Bed from "./svg/bed.svg";

export const Confirmation: React.FunctionComponent<IConfirmation.IProps> = ({
  files,
  curHouse,
  offerPrice
}) => {
  const router = useRouter();
  const sendOffer = () => {
    const UserID = "111111";
    const today = new Date();
    //const UserID = window.localstorage.getItem("userid");
    const request = new Request(
      "http://localhost:5000/api/routes/sellRoutes/addSellOffer",
      {
        method: "POST",
        body: JSON.stringify({
          HouseId: curHouse._id.$oid,
          UserId: UserID,
          OfferPrice: offerPrice,
          OfferDate: today,
          OfferFile: files
        }),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      }
    );
    fetch(request)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.log("errno");
          return;
        }
      })
      .catch(err => console.log("error"));

    router.push("/listing");
  };

  function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  function getKeyByValue(object, value) {
    var final = "";
    var array = Object.keys(object).filter(key => object[key] === value);
    for (var id in array) {
      final = final.concat(array[id]);
      final = final.concat(", ");
    }
    final = final.slice(0, -2);
    return final;
  }

  return (
    <section className={`${styles.NewOffer} wow fadeInUp`}>
      <div className="d-flex align-items-center mt-5">
        <Path />
        <h1 className={styles.title}>Send an Offer</h1>
      </div>
      <Container fluid="lg" className="px-lg-0">
        <Row className={styles.main}>
          <Col>
            <div className="d-flex align-items-center">
              <div className={styles.content}>
                <p>Type: {curHouse.propertyType}</p>
                <p>
                  Asking Price: {currencyFormat(parseInt(curHouse.price, 10))}
                </p>
                <p>Offer Price: {currencyFormat(offerPrice)}</p>
                <p>Location: {curHouse.streetAddress}</p>
                <p>Area: {curHouse.size} sqft</p>
                <p>Bedrooms: {curHouse.bedRoomCount}</p>
                <p>Bathrooms: {curHouse.bathroomCount}</p>
                <p>Parking: {curHouse.parkingCount}</p>
                <p>
                  Features: {getKeyByValue(curHouse.propertyFeatures, true)}
                </p>
                <p>Utility: {getKeyByValue(curHouse.utilities, true)}</p>
              </div>
            </div>
          </Col>
          <Col
            lg="3"
            md="4"
            sm="6"
            xs="12"
            className="d-flex flex-column align-items-start mt-5 mb-5 mt-lg-0"
          >
            <div className={styles["vertical-card"]}>
              <Link href="/listings">
                <div
                  className={`d-flex align-items-center justify-content-start ${styles.cancel}`}
                >
                  <Cancel />
                  <span>Cancel</span>
                </div>
              </Link>

              <p>Your home</p>
              <img src={curHouse.image[0]} alt="" />

              <div className="mt-4 mb-5">
                <div className="mt-2">
                  <Pin />
                  <span className="pl-3">
                    Location: {curHouse.streetAddress}
                  </span>
                </div>
                <div className="mt-2">
                  <Home />

                  <span className="pl-3">{curHouse.size} sqft</span>
                </div>
                <div className="mt-2">
                  <Bed />

                  <span className="pl-3">{curHouse.bedRoomCount} Bedrooms</span>
                </div>
              </div>
              <div className="w-100">
                <Button font="17px" handleClick={sendOffer}>
                  Send Offer
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Confirmation;
