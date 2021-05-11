/**
 *
 * RentalListing
 *
 */
import React, { useState } from "react";

// InterFaces
import { Container, Row, Col } from "react-bootstrap";
import Input from "@Components/Input";
import RadioButton from "@Components/RadioButton";
import Button from "@Components/Button";
import Link from "@Components/Link";
import LineChart from "@Components/OfferLineChart";
import { IRentalListing } from "./RentalListing";
// styles
import styles from "./styles/RentalListing.module.scss";

// assets
import Path from "./svg/path.svg";
import Cancel from "./svg/cancel.svg";

const RentalListing: React.FunctionComponent<IRentalListing.IProps> = ({
  changePageHandler,
  homeInfo,
  setHomeInfo
}) => {
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

  const [get, setGet] = useState<boolean>(false);
  const [yesOrNo, setYesOrNo] = useState<string>("yes");
  const [deposit, setDeposit] = useState<string>("");
  const [rent, setRent] = useState<string>("");
  const [suggestedPrice, setPrice] = useState<any>([0, 0, 0]);
  const [mktPrice, setMktPrice] = useState<string>("Unavailable");
  const update = () => {
    setHomeInfo({
      ...homeInfo,
      securityDeposit: deposit,
      historyPrice: [rent]
    });
    console.log(homeInfo);
    changePageHandler(8);
  };
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
            return res.text();
          } else {
            console.log("error" + res.status);
            return [];
          }
        })
        .then(data => {
          const recent = data.replace(/\n/g, "");
          console.log("fixed" + recent);
          setPrice(recent.split(","));
          //setGet(true);
        })
        .catch(err => console.log("error"));
      //get mkt price
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
            setGet(true);
            return;
          }
        })
        .then(data => {
          const recent = data.avgPrice;
          console.log("fixed" + recent);
          setMktPrice(recent);
          setGet(true);
        })
        .catch(err => console.log("error"));
    }
    return [];
  };
  return (
    <section className={`${styles["rental-listing"]} wow fadeInUp`}>
      <Container className="px-lg-0" fluid="lg">
        <Row>
          <Col>
            <div className={`d-flex align-items-center ${styles.title}`}>
              <Path />
              <span className="ml-2">New Rental Listing</span>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg="6" md="8" sm="10">
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
            <form className={styles.form}>
              <div className={styles["input-form"]}>
                {/* <label htmlFor="Street Address">Monthly Rent</label> */}
                <Input
                  theme="default"
                  type="text"
                  label="Monthly Rent"
                  id="Street Address"
                  value={rent}
                  change={setRent}
                />
              </div>

              <div className={`mt-5 ${styles["input-form"]}`}>
                <label htmlFor="Street Address">Security Deposit</label>
                <Input
                  theme="default"
                  type="text"
                  id="Security Deposit"
                  value={deposit}
                  change={setDeposit}
                />
              </div>
            </form>
            <div
              className={`d-flex align-items-start justify-content-between mt-5 ${styles.question}`}
            >
              <p>First and last required</p>
              <div>
                <RadioButton
                  inputType="yesNoButton"
                  label="Yes"
                  name="rental"
                  value="yes"
                  isChecked={yesOrNo === "yes"}
                  handleChange={val => setYesOrNo(val.target.value)}
                />
              </div>
              <div>
                <RadioButton
                  inputType="yesNoButton"
                  label="No"
                  name="rental"
                  value="no"
                  isChecked={yesOrNo === "no"}
                  handleChange={val => setYesOrNo(val.target.value)}
                />
              </div>
            </div>
            <div className={styles.nextbtn}>
              <Button
                handleClick={update}
                disabled={deposit == "" || rent == ""}
              >
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
export default RentalListing;
