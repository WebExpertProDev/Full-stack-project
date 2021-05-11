/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/indent */
/**
 *
 * PaymentCalculate
 *
 */
import React, { useState, useEffect } from "react";

// styles
import { Container, Row, Col } from "react-bootstrap";
import InputNumber from "@Components/NumberInput";
import styles from "./styles/payment.module.scss";
import RadialNumber from "@Components/RadialNumberInput";
import Money from "./svg/money.svg";

export const PaymentCalculate = ({ detail }) => {
  // console.log(detail);
  const [foo, forceRerender] = useState<number>(0);
  const origPrice = parseFloat(detail.historyPrice[0]);
  const [mortgageYear, setMortgageYear] = useState<number>(5);
  const [price, setPrice] = useState<number>(origPrice);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState<number>(
    50
  );

  const [utilities, setUtilities] = useState<string>("$0");
  const [mortgageInterestRate, setMortgageInterestRate] = useState<string>(
    "0%"
  );
  // const [monthlyExpenses, setMonthlyExpenses] = useState<number>(0);
  // const [homeOwnersInsurance, setHomeOwnersInsurance] = useState<number>(0);
  let minDownPercentage;
  if (price < 500000) {
    minDownPercentage = 5;
  } else if (price < 999999) {
    minDownPercentage = parseFloat(
      ((100 * (500000 * 0.05 + (price - 500000) * 0.1)) / price).toFixed(2)
    );
  } else {
    minDownPercentage = 20;
  }
  console.log(minDownPercentage);

  if (downPaymentPercentage < minDownPercentage) {
    setDownPaymentPercentage(minDownPercentage);
  }

  const getMortgageInterestRate = () => {
    // return x%, not 0.x
    if (
      isNaN(+mortgageInterestRate.slice(0, mortgageInterestRate.length - 1))
    ) {
      return 0;
    }
    return parseFloat(
      mortgageInterestRate.slice(0, mortgageInterestRate.length - 1)
    );
  };

  const getMonthlyMortgage = () => {
    // the formula: p*(r/n)*(1+r/n)**(n*t)/((1+r/n)**(n*t)-1)
    const r = getMortgageInterestRate() / 100;
    const p = getMortgageAmount();
    const n = 12;
    const t = mortgageYear;
    const numerator = p * (r / n) * (1 + r / n) ** (n * t);
    const denomenator = (1 + r / n) ** (n * t) - 1;
    // console.log(r, p, n, t, numerator, denomenator)
    if (denomenator == 0) {
      return 0;
    } else {
      return Math.ceil(numerator / denomenator);
    }
  };

  const getMonthlyExpenses = () => {
    if (
      isNaN(+mortgageInterestRate.slice(0, mortgageInterestRate.length - 1)) ||
      isNaN(+utilities.slice(1))
    ) {
      return 0;
    }
    let propertyTaxes = 0.0;
    let maintenanceFee = 0.0;
    if (detail.propertyTaxes !== undefined) {
      propertyTaxes = parseFloat(detail.propertyTaxes);
    }
    if (detail.maintenanceFee !== undefined) {
      propertyTaxes = parseFloat(detail.maintenanceFee);
    }
    // console.log(getMonthlyMortgage(), parseFloat(utilities.slice(1)), propertyTaxes, maintenanceFee)
    return Math.ceil(
      getMonthlyMortgage() +
        parseFloat(utilities.slice(1)) +
        propertyTaxes +
        maintenanceFee
    );
  };

  const getMortgageInsurance = () => {
    let mortgageAmount = 0;
    let insuranceRate = 0;
    if (downPaymentPercentage < 10) {
      insuranceRate = 4;
    } else if (downPaymentPercentage < 15) {
      insuranceRate = 3.1;
    } else if (downPaymentPercentage < 20) {
      insuranceRate = 2.8;
    }
    mortgageAmount = ((100 - downPaymentPercentage) * price) / 100;
    return (insuranceRate * mortgageAmount) / 100;
  };

  const getMortgageAmount = () => {
    let mortgageAmount = 0;
    let mortgageInsurance = 0;
    let insuranceRate = 0;
    if (downPaymentPercentage < 10) {
      insuranceRate = 4;
    } else if (downPaymentPercentage < 15) {
      insuranceRate = 3.1;
    } else if (downPaymentPercentage < 20) {
      insuranceRate = 2.8;
    }
    mortgageAmount = ((100 - downPaymentPercentage) * price) / 100;
    mortgageInsurance = (insuranceRate * mortgageAmount) / 100;
    return mortgageAmount + mortgageInsurance;
  };

  return (
    <section className={styles["payment-calculate"]}>
      <Container fluid="lg" className="p-0">
        <div className="d-flex align-items-center">
          <span className={styles.title}>Mortgage amortization:</span>
          <div className={styles["input-number"]}>
            <RadialNumber
              currentCount={mortgageYear}
              onChange={setMortgageYear}
              max={25}
              valueChange={5}
            />
          </div>
        </div>

        <Row className="no-gutters">
          <Col
            lg="6"
            md="6"
            sm="10"
            xs="12"
            className={`d-flex flex-column align-items-center justify-content-center mx-auto ${styles["left-custom-tabel"]}`}
          >
            <div className={`w-100 ${styles["table-title"]}`}>Home price</div>
            <div className={`w-100 py-2 ${styles["table-price"]}`}>
              ${price}
            </div>
            <div className={`w-100 ${styles.slidertd}`}>
              <input
                type="range"
                className={styles.slider}
                min={0.5 * origPrice}
                max={2 * origPrice}
                value={price}
                onChange={e => {
                  const value = parseFloat(e.target.value);
                  const percentage =
                    (100 * (value - 0.5 * origPrice)) / (1.5 * origPrice);
                  // console.log(percentage)
                  e.target.style.background = `linear-gradient(to right, #00bbd8 0%, #00bbd8 ${percentage}%, #fff ${percentage}%, #c7c7c7 0%)`;
                  setPrice(value);
                }}
              />
            </div>
            <div className={`w-100 ${styles["left-tabel"]}`}>
              <div className="d-flex justify-content-between">
                <span className={styles.titleTable}>
                  Utilities (Hydro, Gas, etc.)
                </span>
                <input
                  type="text"
                  onChange={e => setUtilities(e.target.value)}
                  value={utilities}
                  className={styles.price}
                />
              </div>
              <div className="d-flex justify-content-between">
                <span className={styles.titleTable}>Property Taxes</span>
                <input
                  type="text"
                  value={"$" + detail.propertyTaxes}
                  className={styles.price}
                  disabled
                />
              </div>
              <div className="d-flex justify-content-between">
                <span className={styles.titleTable}>Maintenance Fee</span>
                <input
                  type="text"
                  value={"$" + detail.maintenanceFee}
                  className={styles.price}
                  disabled
                />
              </div>
            </div>
          </Col>
          <Col
            lg="6"
            md="6"
            sm="10"
            xs="12"
            className={`d-flex flex-column align-items-center justify-content-cener mx-auto ${styles["right-custom-tabel"]}`}
          >
            <div className="d-flex align-items-center w-100">
              <div className={`${styles["table-title"]}`}>Down payment</div>
              <div className={styles.percantage} />
            </div>

            <div
              className={`d-flex align-items-center w-100 justify-content-between ${styles["table-price"]}`}
            >
              <div className={`py-2 ${styles.number}`}>
                $
                {Math.round(
                  mortgageYear != 0
                    ? (downPaymentPercentage * price) / 100
                    : price
                )}
              </div>
              <div className={`py-2 ${styles.percantage}`}>
                {mortgageYear != 0 ? downPaymentPercentage : 100}%
              </div>
            </div>

            <div className={`w-100 ${styles.slidertd}`}>
              <input
                type="range"
                className={styles.slider2}
                min={minDownPercentage}
                value={mortgageYear != 0 ? downPaymentPercentage : 100}
                disabled={mortgageYear == 0}
                style={{
                  background: `linear-gradient(to right, #00bbd8 0%, #00bbd8 ${
                    mortgageYear != 0
                      ? (100 * (downPaymentPercentage - minDownPercentage)) /
                        (100 - minDownPercentage)
                      : 100
                  }%, #fff ${
                    mortgageYear != 0
                      ? (100 * (downPaymentPercentage - minDownPercentage)) /
                        (100 - minDownPercentage)
                      : 100
                  }%, #c7c7c7 0%)`
                }}
                onChange={e => {
                  const value = parseInt(e.target.value, 10);

                  setDownPaymentPercentage(value);
                }}
              />
            </div>
            <div className={`w-100 ${styles["left-tabel"]}`}>
              <div className="d-flex justify-content-between">
                <span className={styles.titleTable}>Mortgage Amount</span>
                <input
                  type="text"
                  value={"$" + Math.round(getMortgageAmount())}
                  className={styles.price}
                  disabled
                />
              </div>
              <div className="d-flex justify-content-between">
                <span className={styles.titleTable}>Mortgage Insurance</span>
                <input
                  type="text"
                  value={"$" + Math.round(getMortgageInsurance())}
                  className={styles.price}
                  disabled
                />
              </div>
              <div className="d-flex justify-content-between">
                <span className={styles.titleTable}>
                  Mortgage Interest Rate
                </span>
                <input
                  type="text"
                  onChange={e => {
                    let v = e.target.value;
                    setMortgageInterestRate(v);
                  }}
                  placeholder="%"
                  value={mortgageInterestRate}
                  className={styles.price}
                />
              </div>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg="5" md="6" sm="7" xs="9">
            <div className={styles["money-svg"]}>
              <Money />
            </div>
            <div className={styles.fairprice}>
              <span className={styles.icon} />
              <span>Fair Price</span>
            </div>
            <span className={`${styles.total} d-flex flex-column`}>
              <div className="d-flex justify-content-between align-items-center px-lg-5 px-3">
                <span>Mortgage Payment/month: </span>
                <span>${getMonthlyMortgage()}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center px-lg-5 px-3 pb-2">
                <span>Total Payment/month exclude tax: </span>
                <span>${getMonthlyExpenses()}</span>
              </div>
            </span>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PaymentCalculate;
