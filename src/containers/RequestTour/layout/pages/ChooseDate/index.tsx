import React, { useState } from "react";

// components
import { Container, Row, Col } from "react-bootstrap";
import Button from "@Components/Button";
import RadioButton from "@Components/RadioButton";
import Link from "@Components/Link";

// interface
import { IChooseDate } from "./ChooseDate";

// styles
import styles from "./styles/ChooseDate.module.scss";

// assets
import Agent from "./svg/aganet.svg";
import Person from "./svg/person.svg";
import Location from "./svg/location.svg";
import Datee from "./svg/date.svg";
import End from "./svg/end.svg";
import Start from "./svg/start.svg";
import Home from "./svg/home.svg";
import Cancelsvg from "./svg/cancel.svg";

export const index: React.FunctionComponent<IChooseDate.IProps> = ({
  changePageHandler,
  agentInfo,
  setAgent,
  setStartDate,
  setEndDate
}) => {
  //const [personOrAgent, setPersonOrAgent] = useState<string>("in-person")
  //localStorage.setIten("HomeAddress", "default")
  const address =
    typeof window !== "undefined" ? localStorage.getItem("HomeAddress") : null;

  const changePage = () => {
    let PostalCode, Province, City;
    if (typeof window !== "undefined") {
      PostalCode = window.localStorage.getItem("PostalCode");
      Province = window.localStorage.getItem("Provience");
      City = window.localStorage.getItem("City");
    }
    //get available date for this house:
    const request = new Request(
      "http://localhost:5000/api/getRentListingbyAddress",
      {
        method: "POST",
        body: JSON.stringify({
          streetAddress: address,
          city: City,
          province: Province,
          postalCode: PostalCode
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
          console.log("errno: status" + res.status);
          return;
        }
      })
      .then(data => {
        setStartDate(data.openHouseDate.start);
        setEndDate(data.openHouseDate.end);
        return;
      })
      .catch(err => console.log("error"));
    changePageHandler(1);
    return;
  };
  //should be street address directly
  return (
    <section className={`${styles.ChooseDate} wow fadeInUp`}>
      <Container fluid="lg" className="px-lg-0">
        <Row className="mt-lg-5">
          <Col
            lg="7"
            sm="6"
            xs="12"
            className="d-flex justify-content-lg-center"
          >
            <div className={styles.tour}>
              <p>New tour</p>

              <p>Would the method you choose?</p>

              <div className={styles.radiobtn}>
                <RadioButton
                  inputType="radioButton"
                  name="chooseDate"
                  value="in-person"
                  handleChange={() => setAgent(false)}
                  isChecked={agentInfo === false}
                  label="In person with Ai"
                  hasIcon={<Person />}
                />

                <div className="mt-4">
                  <RadioButton
                    inputType="radioButton"
                    name="chooseDate"
                    value="in-agent"
                    isChecked={agentInfo === true}
                    handleChange={() => setAgent(true)}
                    label="With agent and Ai"
                    hasIcon={<Agent />}
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col
            lg="4"
            sm="6"
            xs="12"
            className="d-flex flex-column my-5 my-lg-0 my-md-0"
          >
            <div className={styles.right}>
              <div
                className="d-flex justify-content-start align-items-center mb-3  wow fadeInLeft"
                data-wow-delay="1s"
              >
                <Location />
                <span>Location: {address}</span>
              </div>
              <div
                className="d-flex justify-content-start align-items-center mb-3 wow fadeInLeft"
                data-wow-delay="1.1s"
              >
                <Home />
                <span>Homes : 1</span>
              </div>
              <div
                className="d-flex justify-content-start align-items-center mb-3 wow fadeInLeft"
                data-wow-delay="1.3s"
              >
                <Datee />
                <span>Date: Tue, May 26</span>
              </div>
              <div
                className="d-flex justify-content-start align-items-center mb-3 wow fadeInLeft"
                data-wow-delay="1.5s"
              >
                <Start />
                <span>Start: 10:00 am</span>
              </div>
              <div
                className="d-flex justify-content-start align-items-center wow fadeInLeft"
                data-wow-delay="1.7s"
              >
                <End />
                <span>End: 10:30 am</span>
              </div>
            </div>
            <div className="w-100 mt-5">
              <Button font="17px" handleClick={changePage}>
                Next
              </Button>
            </div>
            <Link href="/">
              <div className={styles.cancel}>
                <Cancelsvg />
                <span>cancel</span>
              </div>
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default index;
