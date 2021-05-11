/**
 *
 * OpenHouse
 *
 */
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";

// components
import Button from "@Components/Button";
import RadioButton from "@Components/RadioButton";
import Link from "@Components/Link";
import Input from "@Components/Input";
// styles
import styles from "./styles/OpenHouse.module.scss";

// InterFaces
import { IOpenHouse } from "./OpenHouse";

// assets
import Cancel from "./svg/cancel.svg";

export const OpenHouse: React.FunctionComponent<IOpenHouse.IProps> = ({
  changePageHandler,
  homeInfo,
  setHomeInfo
}) => {
  const [startAmOrPm, setStartAmOrPm] = useState<string>("am");
  const [endAmOrPm, setEndAmOrPm] = useState<string>("am");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState<string>("06");
  const [startMin, setStartMin] = useState<string>("00");
  const [endTime, setEndTime] = useState<string>("06");
  const [endMin, setEndMin] = useState<string>("00");
  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const update = () => {
    startDate.setHours(parseInt(startTime), parseInt(startMin), parseInt("00"));
    endDate.setHours(parseInt(endTime), parseInt(endMin), parseInt("00"));
    setHomeInfo({
      ...homeInfo,
      openHouseDate: {
        start: startDate
          .setHours(
            parseInt(startTime) + (startAmOrPm == "pm" ? 12 : 0),
            parseInt(startMin),
            parseInt("00")
          )
          .toString(),
        end: endDate
          .setHours(
            parseInt(endTime) + (endAmOrPm == "pm" ? 12 : 0),
            parseInt(endMin),
            parseInt("00")
          )
          .toString()
      }
    });
    console.log(homeInfo);
    //   console.log(startDate.toTimeString())
    changePageHandler(7);
  };
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  function add0(number, type) {
    if (number == 0 && type == "hr") {
      return "12";
    }
    if (number < 10) {
      return "0" + String(number);
    } else return String(number);
  }
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

  return (
    <section className={`${styles["open-house-section"]} wow fadeInUp`}>
      <Container fluid="lg" className="px-lg-0">
        <Row>
          <Col
            lg="6"
            md="7"
            sm="10"
            xs="12"
            className="d-flex flex-column align-items-start"
          >
            <p className={styles.title}>Open house</p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col
            lg="6"
            md="7"
            sm="10"
            className="d-flex flex-column align-items-center"
          >
            <div
              className={`${styles.calender} d-flex flex-wrap align-items-center w-100`}
            >
              <div className={styles["calender-left"]}>
                <p className={styles["calender-title"]}>Choose Date</p>
                <div className={styles["calender-container"]}>
                  <DatePicker
                    //  calendarClassName={styles.calender}
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    selectsRange
                    inline
                  />
                </div>
              </div>

              <div
                className={`${styles.time} d-flex flex-lg-column flex-md-column
               flex-sm-column flex-row justify-content-lg-center justify-content-md-center justify-content-around ml-3`}
              >
                <div className={`mt-3 mt-lg-0 mt-md-0 ${styles["start-time"]}`}>
                  <p>Strat Time</p>
                  <div
                    className={`d-flex flex-column align-items-center justify-content-center  ${styles["time-container"]}`}
                  >
                    <div className="w-100 h-50 d-flex align-items-center justify-content-center">
                      <input
                        type="text"
                        onChange={e => {
                          let v = e.target.value;
                          setStartTime(add0(Number(v) % 12, "hr"));
                        }}
                        value={startTime}
                        className={styles.price}
                      />
                      <p>:</p>
                      <input
                        type="text"
                        onChange={e => {
                          let v = e.target.value;
                          setStartMin(add0(Number(v) % 60));
                        }}
                        value={startMin}
                        className={styles.price}
                      />
                    </div>
                    <div className="d-flex w-100 h-50 ">
                      <span
                        role="Button"
                        tabIndex={-1}
                        onKeyDown={() => setStartAmOrPm("am")}
                        className={
                          startAmOrPm === "am" ? styles.selected : null
                        }
                        onClick={() => setStartAmOrPm("am")}
                      >
                        AM
                      </span>
                      <span
                        role="Button"
                        onKeyDown={() => setStartAmOrPm("pm")}
                        tabIndex={-1}
                        className={
                          startAmOrPm === "pm" ? styles.selected : null
                        }
                        onClick={() => setStartAmOrPm("pm")}
                      >
                        PM
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`mt-3 ${styles["end-time"]}`}>
                  <p>End Time</p>
                  <div
                    className={`d-flex flex-column align-items-center justify-content-center  ${styles["time-container"]}`}
                  >
                    <div className="w-100 h-50 d-flex align-items-center justify-content-center">
                      <input
                        type="text"
                        onChange={e => {
                          let v = e.target.value;
                          setEndTime(add0(Number(v) % 12));
                        }}
                        value={endTime}
                        className={styles.price}
                      />
                      <p>:</p>
                      <input
                        type="text"
                        onChange={e => {
                          let v = e.target.value;
                          setEndMin(add0(Number(v) % 60));
                        }}
                        value={endMin}
                        className={styles.price}
                      />
                    </div>
                    <div className="d-flex w-100 h-50 ">
                      <span
                        role="Button"
                        onKeyDown={() => setEndAmOrPm("am")}
                        tabIndex={-1}
                        className={endAmOrPm === "am" ? styles.selected : null}
                        onClick={() => setEndAmOrPm("am")}
                      >
                        AM
                      </span>
                      <span
                        role="Button"
                        onKeyDown={() => setEndAmOrPm("pm")}
                        tabIndex={-1}
                        className={endAmOrPm === "pm" ? styles.selected : null}
                        onClick={() => setEndAmOrPm("pm")}
                      >
                        PM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="w-100 mt-3">
              <Button theme="outline">OK</Button>
            </div> */}
          </Col>

          <Col
            lg={{ offset: 1, span: 5 }}
            md="7"
            sm="10"
            xs="12"
            className="mt-5 d-flex flex-column
        align-items-end justify-content-between"
          >
            <div className={styles["time-desc"]}>
              {/* <span className={styles.title}>March</span> */}

              <div
                className={`d-flex align-items-center ${styles["chat-calender"]}`}
              >
                <div
                  className={`d-flex flex-column align-items-start  justify-content-center w-50 ${styles["start-time-review"]}`}
                >
                  <span className={`pl-4 ${styles.title}`}>
                    {month[startDate.getMonth()]}
                  </span>
                  <span className="pl-4">
                    {startDate.getDate()} - {weekday[startDate.getDay()]}
                  </span>
                  <div className="d-flex align-items-center mt-2 pl-4">
                    <span>Start Time:</span>
                    <span className="ml-2">
                      {" "}
                      {startTime}:{startMin} {startAmOrPm}{" "}
                    </span>
                  </div>

                  <div className="d-flex align-items-center mt-2 pl-4">
                    <span>End Time:</span>
                    <span className="ml-2">
                      {" "}
                      {endTime}:{endMin} {endAmOrPm}{" "}
                    </span>
                  </div>
                </div>
                <div
                  className={`d-flex flex-column align-items-start  justify-content-center w-50 ${styles["end-time-review"]}`}
                >
                  <span className={`pl-4 ${styles.title}`}>
                    {month[endDate ? endDate.getMonth() : startDate.getMonth()]}
                  </span>
                  <span className="pl-4">
                    {endDate ? endDate.getDate() : startDate.getDate()} -{" "}
                    {weekday[endDate ? endDate.getDay() : startDate.getDay()]}
                  </span>
                  <div className="d-flex align-items-center mt-2 pl-4">
                    <span>Start Time:</span>
                    <span className="ml-2">
                      {" "}
                      {startTime}:{startMin} {startAmOrPm}{" "}
                    </span>
                  </div>

                  <div className="d-flex align-items-center mt-2 pl-4">
                    <span>End Time:</span>
                    <span className="ml-2">
                      {" "}
                      {endTime}:{endMin} {endAmOrPm}{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Col lg="8" md="8" sm="12" xs="12">
              <div className={styles.nextbtn}>
                <Button handleClick={update} disabled={endDate == null}>
                  Next
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
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default OpenHouse;
