/**
 *
 * Offers
 *
 */
import React, { useState, useContext, useEffect } from "react";

import CustomLineChart from "@Components/OfferLineChart";

// styles
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles/Offers.module.scss";

export const Offers = ({ detail }) => {
  const [response, setResponse] = useState<Float>(0);
  console.log(detail);
  const data = {
    tax: detail.propertyTaxes || 1835.09,
    maintenance_fee: detail.maintenanceFee || 392.06,
    bedrooms: detail.overview.bedroomCount || 1,
    bathrooms: detail.overview.bathroomCount || 1,
    parking_included: detail.overview.parkingCount ? 1 : 0,
    parking_spots: detail.overview.parkingCount || 0,
    has_balcony: detail.propertyFeatures.balcony || 1,
    sqft_min: detail.overview.size || 500,
    sqft: detail.overview.size || 550,
    pool: 0
  };
  const request = new Request("https://housee-ml.herokuapp.com/api", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  });
  useEffect(() => {
    fetch(request)
      .then(res => {
        if (res.status === 200) {
          return res.text();
        } else {
          console.log("errno");
          return;
        }
      })
      .then(d => {
        setResponse([
          parseFloat(d.split(",")[2]).toFixed(2),
          parseFloat(d.split(",")[3]).toFixed(2)
        ]);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <section className={styles.offer}>
      <Container fluid="lg" className="p-lg-0">
        <Row>
          <Col lg="7" md="12">
            <div className={styles.tree}>
              <CustomLineChart responsiveSize={[280, 500, 650, 600, 600]} />
            </div>
          </Col>
          <Col
            lg="5"
            md="12"
            className="d-flex flex-column justify-content-end  mb-4"
          >
            <div>
              <p>Housee Intelligence insight: 2500$ to 3000$</p>

              <p>
                Market price: {response[0]} to {response[1]}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Offers;
