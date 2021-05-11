/**
 *
 * ChooseDate2
 *
 */
import React, { useState, useContext } from "react";

import { Container, Row, Col } from "react-bootstrap";
import Button from "@Components/Button";
import Link from "@Components/Link";
import RadioButton from "@Components/RadioButton";
import { useRouter } from "next/router";
import BCalendar from "@Components/Calender";
import userContext from "../../../../../context/userContext";
// styles
import styles from "./styles/ChooseDate.module.scss";

// InterFaces
import { IChooseDate2 } from "./ChooseDate2";

// assets
import Agentt from "./svg/aganet.svg";
import Person from "./svg/person.svg";
import Location from "./svg/location.svg";
import Datew from "./svg/date.svg";
import End from "./svg/end.svg";
import Start from "./svg/start.svg";
import Home from "./svg/home.svg";
import Cancelsvg from "./svg/cancel.svg";

export const ChooseDate2: React.FunctionComponent<IChooseDate2.IProps> = ({
  changePageHandler,
  currentDate,
  setCurrentDate,
  agentInfo,
  setAgent,
  startDate,
  endDate
}) => {
  const { user, setUser } = useContext(userContext);
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const address =
    typeof window !== "undefined" ? localStorage.getItem("HomeAddress") : null;
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  function Half(i) {
    if (i > 12) {
      return i - 12;
    }
    return i;
  }
  const requestTour = () => {
    if (!agentInfo) {
      if (user.username == null) {
        console.log("User not logged in");
        changePageHandler(3);
      } else {
        changePageHandler(4);
      }
      return;
    } else {
      changePageHandler(2);
      return;
    }
  };
  //const [value, onChange] = useState(`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`);
  return (
    <section className={`${styles.ChooseDate} wow fadeInUp`}>
      <Container className="px-lg-0" fluid="lg">
        <Row>
          <Col lg="12" md="12">
            <div className={styles.tour}>
              <p>New tour</p>

              <p>Would the method you choose?</p>

              <div className={styles.radiobtn}>
                <div className="mr-5">
                  <RadioButton
                    name="chatMethod"
                    inputType="radioButton"
                    value="in-person"
                    handleChange={() => setAgent(false)}
                    isChecked={agentInfo === false}
                    label="Tour in person"
                    hasIcon={<Person />}
                  />
                </div>

                <div className={styles["tour-chat"]}>
                  <RadioButton
                    name="chatMethod"
                    value="in-agent"
                    isChecked={agentInfo === true}
                    handleChange={() => setAgent(true)}
                    inputType="radioButton"
                    label="Tour via video chat"
                    hasIcon={<Agentt />}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid="lg" className="px-lg-0">
        <Row>
          <Col
            lg="7"
            md="8"
            sm="8"
            xs="12"
            className="d-flex justify-content-lg-center"
          >
            <div>
              <div className={styles.cdate}>
                <span>Choose Date:</span>
              </div>

              <BCalendar
                selectDate={currentDate}
                setDate={setCurrentDate}
                startDate={new Date(startDate)}
                endDate={new Date(endDate)}
              />
            </div>
          </Col>
          <Col
            lg="4"
            md="5"
            sm="6"
            xs="10"
            className="d-flex flex-column mt-4 mt-md-5 mt-lg-0"
          >
            <div className={`${styles.right} d-flex flex-column mt-5 mt-md-0`}>
              <div
                className="d-flex justify-content-start align-items-center mb-3  wow fadeInUp"
                data-wow-delay="1.4s"
              >
                <Location />
                <span>Location: {address}</span>
              </div>

              <div
                className="d-flex  justify-content-start align-items-center mb-3 wow fadeInUp"
                data-wow-delay="1.5s"
              >
                <Home />
                <span>Homes : 1</span>
              </div>

              <div
                className="d-flex  justify-content-start align-items-center mb-3 wow fadeInUp"
                data-wow-delay="1.7s"
              >
                <Datew />
                <span>
                  Date: {weekday[currentDate.getDay()]},{" "}
                  {month[currentDate.getMonth()]} {currentDate.getDate()}
                </span>
              </div>

              <div
                className="d-flex justify-content-start align-items-center mb-3 wow fadeInUp"
                data-wow-delay="1.9s"
              >
                <Start />
                <span>
                  Start: {addZero(Half(currentDate.getHours()))}:
                  {addZero(currentDate.getMinutes())}{" "}
                  {currentDate.getHours() >= 12 ? "pm" : "am"}
                </span>
              </div>

              <div
                className="d-flex    justify-content-start align-items-center  wow fadeInUp"
                data-wow-delay="2s"
              >
                <End />
                <span>
                  End:{" "}
                  {addZero(
                    Half(
                      currentDate.getMinutes() >= 30
                        ? currentDate.getHours() + 1
                        : currentDate.getHours()
                    )
                  )}
                  :
                  {addZero(
                    currentDate.getMinutes() >= 30
                      ? currentDate.getMinutes() - 30
                      : currentDate.getMinutes() + 30
                  )}{" "}
                  {currentDate.getHours() >= 12 ? "pm" : "am"}
                </span>
              </div>
            </div>
            <div className="w-100 mt-5">
              <Button handleClick={requestTour} font="17px">
                request a tour
              </Button>
            </div>
            <div className="w-100 mt-2">
              <Button
                handleClick={() => changePageHandler(0)}
                font="17px"
                theme="outline"
              >
                Back
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
  //};
};
//render(<ChooseDate2 />)
export default ChooseDate2;
