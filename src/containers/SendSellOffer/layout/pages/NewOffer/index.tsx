/**
 *
 * NewOffer
 *
 */
import React, { useState, useEffect } from "react";

// components
import { Container, Row, Col } from "react-bootstrap";
import Button from "@Components/Button";
import SelectInput from "@Components/SelectInput";
import Link from "@Components/Link";
import Input from "../../../../../components/Input";
// InterFaces
import { INewOffer } from "./NewOffer";
import useFormFields from "@Services/hooks/useFormFields";

// styles
import styles from "./styles/NewOffer.module.scss";

// assets
import Path from "./svg/path.svg";
import Cancel from "./svg/cancel.svg";
import CartImg from "./svg/image.png";
import Home from "./svg/home.svg";
import Pin from "./svg/pin.svg";
import Bed from "./svg/bed.svg";
import CustomLineChart from "@Components/OfferLineChart";

export const NewOffer: React.FunctionComponent<INewOffer.IProps> = ({
  changePageHandler,
  curHouse,
  offerPrice,
  setPrice
}) => {
  const [allItems, setAllItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [oriPrice, setOriprice] = useState(offerPrice);

  const insightUpper = oriPrice + 10000;
  const insightLower = oriPrice - 10000;
  /*
   const data = {
     "tax":1835.09,
     "maintenance_fee":392.06,
     "bedrooms": curHouse.bedRoomCount,
     "bathrooms":curHouse.bathRoomCount,
     "parking_included":curHouse.propertyFeatures.parking ? 1 : 0,
     "parking_spots":curHouse.parkingCount,
     "has_balcony":curHouse.propertyFeatures.balcony? 1 : 0,
     "sqft_min":curHouse.size,
     "sqft":curHouse.size,
     "pool":curHouse.propertyFeatures.swimmingPool? 1 : 0
     }
   const response = fetch(
     "https://housee-ml.herokuapp.com/api",
     {
       method: "POST",
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify(data)
     }
   );
   */

  const selectItem = item => {
    setPrice(item.costNum);
  };

  useEffect(() => {
    console.log(offerPrice);
    var alli = JSON.parse(JSON.stringify(allItems));
    for (var i = 0; i < alli.length; i++) {
      if (alli[i].costNum == offerPrice) {
        alli[i].status = true;
      } else {
        alli[i].status = false;
      }
    }
    setItems(alli.slice(index - 2, index + 3));
  }, [offerPrice]);

  function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const next = () => {
    if (index < 498) {
      setIndex(index + 1);
    }
    console.log(index);
  };
  const back = () => {
    if (index > 2) {
      setIndex(index - 1);
    }
  };

  useEffect(() => {
    console.log(items);
  }, [items]);
  useEffect(() => {
    setItems(allItems.slice(index - 2, index + 3));
  }, [index]);

  useEffect(() => {
    var curAdded = 0;
    var alli = [];
    var idx = 0;
    for (let i = 0; i < 5000000; i += 10000) {
      alli.push({
        cost: currencyFormat(i),
        costNum: i + curAdded,
        status: false
      });
      if (i < offerPrice && i + 10000 > offerPrice) {
        alli.push({
          cost: currencyFormat(offerPrice),
          costNum: offerPrice,
          status: true
        });
        idx = i / 10000 + 1;
        curAdded = 1;
      }
    }
    setAllItems(alli);
    setItems(alli.slice(idx - 2, idx + 3));
    setIndex(idx);
  }, []);

  return (
    <section className={`${styles.NewOffer} wow fadeInUp`}>
      <div className="d-flex align-items-center mt-5">
        <Path />
        <h1 className={styles.title}>New Sell Offer</h1>
      </div>
      <Container fluid="lg" className="px-lg-0">
        <Row className={styles.main}>
          <Col
            lg="9"
            md="12"
            sm="12"
            xs="12"
            className="d-flex flex-column align-items-lg-start align-items-center "
          >
            <p className={styles["graf-title"]}>Your Offer</p>
            <div className={styles.graf}>
              <CustomLineChart
                responsiveSize={[280, 500, 480, 580, 580]}
                amount={[insightUpper, insightLower + 10000, insightLower]}
              />
            </div>

            <div className={styles.content}>
              <p>
                Housee Intelligence insight: {currencyFormat(insightUpper)} to{" "}
                {currencyFormat(insightLower)}
              </p>
              <p>
                Listing Price: {currencyFormat(parseInt(curHouse.price, 10))}
              </p>
            </div>

            <div className={`mb-5 ${styles["select-wrapper"]}`}>
              <p className={`ml-4 ${styles["graf-title"]}`}>Your Offer</p>
              <SelectInput
                backHandler={back}
                nextHandler={next}
                items={items}
                selectHandler={selectItem}
              />
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
              <Link href="/listing">
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
                <Button font="17px" handleClick={() => changePageHandler(1)}>
                  Next
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NewOffer;
