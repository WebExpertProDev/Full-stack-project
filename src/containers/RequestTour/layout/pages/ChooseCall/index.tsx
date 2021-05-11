import React, { useState, useContext } from "react";

// components
import { Container, Row, Col } from "react-bootstrap";
import Button from "@Components/Button";
import Link from "@Components/Link";
import RadioButton from "@Components/RadioButton";
import userContext from "../../../../../context/userContext";
// interface
import { IChooseCall } from "./ChooseCall";

// styles
import styles from "./styles/ChooseCall.module.scss";

// assets
import Agent from "./svg/aganet.svg";
import Personsvg from "./svg/person.svg";
import Path from "./svg/path.svg";
import FaceTime from "./svg/facetime.svg";
import Google from "./svg/google-duo.svg";
import Skype from "./svg/skype.svg";
import Whatsapp from "./svg/whatsapp.svg";
import Cancel from "./svg/cancel.svg";
import CartImg from "./svg/image.png";
import Home from "./svg/home.svg";
import Pin from "./svg/pin.svg";
import Bed from "./svg/bed.svg";

export const index: React.FunctionComponent<IChooseCall.IProps> = ({
  changePageHandler,
  setappType,
  agentInfo,
  setAgent
}) => {
  const address =
    typeof window !== "undefined" ? localStorage.getItem("HomeAddress") : null;
  const { user, setUser } = useContext(userContext);
  const changePage = () => {
    if (user.username == null) {
      console.log("User not logged in");
      changePageHandler(3);
    } else {
      changePageHandler(4);
    }
  };
  return (
    <section className={`${styles.ChooseCall} wow fadeInUp`}>
      <div className="d-flex align-items-center">
        <Path />
        <h1 className={styles.title}>Request a Tour</h1>
      </div>
      <Container fluid="lg" className="px-lg-0">
        <Row>
          <Col lg="9" md="12" sm="12" xs="12">
            <p className={styles["choose-title"]}>
              Which video chat app would you like to use for the tour?
            </p>

            <div className="d-flex flex-lg-row flex-md-row flex-sm-row flex-column justify-content-between flex-wrap ">
              <div
                className={`mt-4 ${styles.radiobutton} wow fadeInLeft`}
                data-wow-delay="1s"
              >
                <RadioButton
                  name="videoChat"
                  inputType="radioButton"
                  label="FaceTime"
                  hasIcon={<FaceTime />}
                  handleChange={() => setappType("FaceTime")}
                />
              </div>
              <div
                className={`mt-4 ${styles.radiobutton} wow fadeInLeft`}
                data-wow-delay="1.1s"
              >
                <RadioButton
                  name="videoChat"
                  inputType="radioButton"
                  label="Google Duo"
                  hasIcon={<Google />}
                  handleChange={() => setappType("Google Duo")}
                />
              </div>
              <div
                className={`mt-4 ${styles.radiobutton} wow fadeInLeft`}
                data-wow-delay="1.3s"
              >
                <RadioButton
                  name="videoChat"
                  inputType="radioButton"
                  label="Skype"
                  hasIcon={<Skype />}
                  handleChange={() => setappType("Skype")}
                />
              </div>
              <div
                className={`mt-4 ${styles.radiobutton} wow fadeInLeft`}
                data-wow-delay="1.5s"
              >
                <RadioButton
                  name="videoChat"
                  inputType="radioButton"
                  label="WhatsApp"
                  hasIcon={<Whatsapp />}
                  handleChange={() => setappType("WhatsApp")}
                />
              </div>
            </div>

            <p className={styles["choose-title"]}>
              How you want to rent a home?
            </p>
            <div className="d-flex flex-lg-row flex-md-row flex-sm-row flex-column flex-wrap">
              <div
                className={`mt-4 ${styles.radiobutton} wow fadeInLeft`}
                data-wow-delay="1.6s"
              >
                <RadioButton
                  inputType="radioButton"
                  name="chooseDate"
                  value="in-person"
                  handleChange={setAgent(false)}
                  isChecked={agentInfo === false}
                  label="In person with Ai"
                  hasIcon={<Personsvg />}
                />
              </div>
              <div
                className={`mt-4 ml-lg-5 ml-md-5  ml-sm-5   ${styles.radiobutton} wow fadeInLeft`}
                data-wow-delay="1.8s"
              >
                <RadioButton
                  inputType="radioButton"
                  name="chooseDate"
                  value="in-agent"
                  isChecked={agentInfo === true}
                  handleChange={setAgent(true)}
                  label="With agent and Ai"
                  hasIcon={<Agent />}
                />
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
              <Link href="/">
                <div
                  className={`d-flex align-items-center justify-content-start ${styles.cancel}`}
                >
                  <Cancel />
                  <span>Cancel</span>
                </div>
              </Link>

              <p>Your home</p>
              <img src={CartImg} alt="" />

              <div className="mt-4 mb-5">
                <div className="mt-2">
                  <Pin />
                  <span className="pl-3">Location: {address}</span>
                </div>
                <div className="mt-2">
                  <Home />

                  <span className="pl-3">230 sqft</span>
                </div>
                <div className="mt-2">
                  <Bed />

                  <span className="pl-3">3 Beds</span>
                </div>
              </div>
              <div className="w-100">
                <Button font="17px" handleClick={changePage}>
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
export default index;
