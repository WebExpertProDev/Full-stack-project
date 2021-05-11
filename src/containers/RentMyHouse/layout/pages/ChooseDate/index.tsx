import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Container, Row, Col } from "react-bootstrap";
import Button from "@Components/Button";
import Link from "@Components/Link";
import { IChooseDate } from "./ChooseDate";
// styles
import styles from "./styles/Choose-Date.module.scss";

// assets
import Cancel from "./svg/cancel.svg";

export const index: React.FunctionComponent<IChooseDate.IProps> = ({
  changePageHandler,
  homeInfo,
  setHomeInfo
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const update = () => {
    // setHomeInfo({...homeInfo, availabilityDate:{
    //   start: startDate.toString(),
    //   end: endDate.toString(),
    // }})
    setHomeInfo({
      ...homeInfo,
      availabilityDate: { start: startDate.toString(), end: endDate.toString() }
    });
    console.log(homeInfo);
    changePageHandler(4);
  };

  return (
    <section className="wow fadeInUp">
      <Container fluid="lg" className="px-lg-0">
        <Row>
          <Col lg="4" md="8" sm="8" xs="12" className="mx-auto">
            <div className={`${styles["calender-title"]} mt-5 `}>
              Availability date
            </div>
            <div className={`${styles.calender} mt-1`}>
              <DatePicker
                calendarClassName={styles.customcalender}
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                selectsRange
                inline
              />
            </div>
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
        </Row>
      </Container>
    </section>
  );
};

export default index;
