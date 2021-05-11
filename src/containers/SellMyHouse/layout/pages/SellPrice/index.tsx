/**
 *
 * SellPrice
 *
 */
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "@Components/Button";
import Link from "@Components/Link";
import Input from "@Components/Input";
import LineChart from "@Components/OfferLineChart";
// InterFaces
import { ISellPrice } from "./SellPrice";

// styles
import styles from "./styles/SellPrice.module.scss";

// assets
import Cancel from "./svg/cancel.svg";
import Path from "./svg/path.svg";

export const SellPrice: React.FunctionComponent<ISellPrice.IProps> = ({
  changePageHandler,
  homeInfo,
  setHomeInfo
}) => {
  const [get, segGet] = useState<boolean>(false);
  const data = {
    tax: 0,
    maintenance_fee: 0,
    bedrooms: Number(homeInfo.overview.bedroomCount),
    bathrooms: Number(homeInfo.overview.bathroomCount),
    parking_included: homeInfo.overview.parkingCount == "0" ? 0 : 1,
    parking_spots: Number(homeInfo.overview.parkingCount),
    has_balcony: homeInfo.propertyFeatures.balcony ? 0 : 1,
    sqft_min: Math.max(Number(homeInfo.overview.size) - 50, 0),
    sqft: Number(homeInfo.overview.size),
    pool: homeInfo.propertyFeatures.balcony ? 0 : 1
  };
  const [price, setPrice] = useState<string>("");
  const [mktPrice, setMktPrice] = useState<string>("Unavailable");
  const [suggestedPrice, setSuggestPrice] = useState<any>([0, 0, 0]);
  const getPrice = () => {
    if (!get) {
      const request = new Request("https://housee-ml.herokuapp.com/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      fetch(request)
        .then(res => {
          if (res.status === 200) {
            console.log(res.status);
            return res.text();
          } else {
            console.log("error" + res.status);
            return [];
          }
        })
        .then(data => {
          const recent = data.replace(/\n/g, "");
          console.log("fixed" + recent);
          setSuggestPrice(recent.split(","));
          // segGet(true);
        })
        .catch(err => console.log("error"));
      const mktRequest = new Request(
        "http://localhost:5000/api/getMarketAvgPrice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(homeInfo)
        }
      );
      fetch(mktRequest)
        .then(res => {
          if (res.status === 200) {
            return res.json();
          } else {
            console.log("error" + res.status);
            segGet(true);
            return;
          }
        })
        .then(data => {
          const recent = data.avgPrice;
          console.log("fixed" + recent);
          setMktPrice(recent);
          segGet(true);
        })
        .catch(err => console.log("error"));
    }

    return [];
  };
  const update = () => {
    getPrice();
    setHomeInfo({ ...homeInfo, securityDeposit: "0", historyPrice: [price] });
    console.log(homeInfo);
    changePageHandler(8);
  };
  return (
    <section className={`${styles["rental-listing"]} wow fadeInUp`}>
      <Container className="px-lg-0" fluid="lg">
        <Row>
          <Col>
            <div className={`d-flex align-items-center ${styles.title}`}>
              <Path />
              <span className="ml-2">New Sell Listing</span>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg="6" md="8" sm="10">
            <p className={styles.grafTitle}>Your Offer</p>
            <div className={styles.graf}>
              <LineChart
                responsiveSize={getPrice()}
                width={1}
                amount={suggestedPrice}
              />
            </div>

            <div className={`d-flex mt-5 ${styles.content}`}>
              Housee Intelligence insight:{" "}
              {Math.round(Number(suggestedPrice[2]) * 0.9)}$ to{" "}
              {Math.round(Number(suggestedPrice[2]))}$
              {/* <span>Min & max 10-20%</span> */}
            </div>
            <span className={`d-flex  mt-2 ${styles.content}`}>
              Min & max 10-20%
            </span>
            <p className={`d-flex  mt-2 ${styles.content}`}>
              Market price:
              <span> {mktPrice}</span>
            </p>
          </Col>

          <Col
            lg="6"
            md="4"
            sm="10"
            className="d-flex flex-column align-items-end"
          >
            <div
              className={`d-flex align-items-start justify-content-between mt-5 ${styles.question}`}
            />
            <div className={styles.nextbtn}>
              <div className="w-100 mb-5">
                <Input
                  label="Selling price"
                  type="text"
                  theme="default"
                  value={price}
                  change={setPrice}
                />
              </div>

              <Button handleClick={update} disabled={price == ""}>
                Select
              </Button>
              <Link href="/">
                <div
                  className={`${styles.cancel} d-flex align-items-center mt-2`}
                >
                  <Cancel />
                  <span className="ml-1">Cancel</span>
                </div>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default SellPrice;
