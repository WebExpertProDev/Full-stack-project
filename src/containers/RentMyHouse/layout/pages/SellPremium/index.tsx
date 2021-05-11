/**
 *
 * SellPremium
 *
 */
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import Modal from "../Modal"
// componetns
import Button from "@Components/Button";
import CheckoutForm from "@Components/Checkout/CheckoutForm";
// InterFaces
import { ISellPremium } from "./SellPremium";

// svg
import Tick from "./svg/tick.svg";

// styles
import styles from "./styles/SellPremium.module.scss";

export const SellPremium: React.FunctionComponent<ISellPremium.IProps> = ({
  changePageHandler
}) => {
  const [payment, setPayment] = useState<string>("0");
  const [text, setText] = useState<string>("Back to Dashboard");
  const selectPlanA = () => {
    setPayment("0");
    setText("Back to Dashboard");
  };
  const selectPlanB = () => {
    setPayment("9900");
    setText("Proceed to Payment");
  };
  const selectPlanC = () => {
    setPayment("12000");
    setText("Proceed to Payment");
    console.log("12000");
  };
  return (
    <section className="wow fadeInUp">
      <Container className="px-lg-0" fluid="lg">
        <Row className="justify-content-center mt-5">
          <Col
            lg="3"
            md="4"
            sm="7"
            xs="11"
            className="d-flex flex-column align-items-center justify-content-center mt-4"
          >
            <p className={styles.title}>Most Popular</p>

            <div
              className={
                payment == "0"
                  ? styles["price-card-selected"]
                  : styles["price-card"]
              }
              onClick={selectPlanA}
            >
              <span className={styles["price-title"]}>free</span>

              <ul>
                <li>
                  <Tick className="mr-2" />
                  Donec enim nulla malesuada
                </li>
                <li>
                  <Tick className="mr-2" />
                  Sed venenatis vel, blandit vel
                </li>
                <li>
                  <Tick className="mr-2" />
                  Duis ultricies scelerisque
                </li>
              </ul>
            </div>
          </Col>
          <Col
            lg="3"
            md="4"
            sm="7"
            xs="11"
            className="d-flex flex-column align-items-center justify-content-center mt-4"
          >
            <p className={styles.title}>Maximum Visibility</p>
            <div
              className={
                payment == "9900"
                  ? styles["price-card-selected"]
                  : styles["price-card"]
              }
              onClick={selectPlanB}
            >
              <span className={styles["price-title"]}>premium</span>

              <span className={styles.price}>
                <small className="mr-1">$</small>
                <span>99</span>
                <strong className="ml-2">/mo</strong>
              </span>
              <ul>
                <li>
                  <Tick className="mr-2" />
                  Donec enim nulla malesuada
                </li>
                <li>
                  <Tick className="mr-2" />
                  Sed venenatis vel, blandit vel
                </li>
                <li>
                  <Tick className="mr-2" />
                  Duis ultricies scelerisque
                </li>
              </ul>
            </div>
          </Col>
          <Col
            lg="3"
            md="4"
            sm="7"
            xs="11"
            className="d-flex flex-column align-items-center justify-content-center mt-4"
          >
            <p className={styles.title}>Maximum Visibility</p>
            <div
              className={
                payment == "12000"
                  ? styles["price-card-selected"]
                  : styles["price-card"]
              }
              onClick={selectPlanC}
            >
              <span className={styles["price-title"]}>premium plus</span>

              <span className={styles.price}>
                <small className="mr-1">$</small>
                <span>120</span>
                <strong className="ml-2">/mo</strong>
              </span>
              <ul>
                <li>
                  <Tick className="mr-2" />
                  Donec enim nulla malesuada
                </li>
                <li>
                  <Tick className="mr-2" />
                  Sed venenatis vel, blandit vel
                </li>
                <li>
                  <Tick className="mr-2" />
                  Duis ultricies scelerisque
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col lg="9" md="12" sm="7" xs="11">
            <CheckoutForm amount={payment} Text={text} />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default SellPremium;
