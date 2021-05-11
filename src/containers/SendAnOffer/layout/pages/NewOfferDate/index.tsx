/**
 *
 * NewOfferDate
 *
 */
import React, { useState } from "react"

// InterFaces
// components
import { Container, Row, Col } from "react-bootstrap"
import Button from "@Components/Button"
import DatePicker from "react-datepicker"
import Link from "@Components/Link"
import RadioButton from "@Components/RadioButton"
import { INewOfferDate } from "./NewOfferDate"
// styles
import styles from "./styles/OfferDate.module.scss"

// assets
import Path from "./svg/path.svg"
import Cancel from "./svg/cancel.svg"
import CartImg from "./svg/image.png"
import Home from "./svg/home.svg"
import Pin from "./svg/pin.svg"
import Bed from "./svg/bed.svg"

export const NewOfferDate: React.FunctionComponent<INewOfferDate.IProps> = () => {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(null)
  const onChange = dates => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }
  return (
    <section className={`${styles.NewOffer} wow fadeInUp`}>
      <div className="d-flex align-items-center mt-5">
        <Path />
        <h1 className={styles.title}>Send an Offer</h1>
      </div>
      <Container fluid="lg" className="px-lg-0">
        <Row className={styles.main}>
          <Col
            lg={{ offset: 2, span: 7 }}
            md="12"
            sm="12"
            xs="12"
            className="d-flex flex-column align-items-lg-start align-items-center ">
            <div className={`${styles["calender-title"]} mt-5  w-100 `}>Availability date</div>
            <div className={`${styles.calender} mt-1`}>
              <DatePicker
                calendarClassName={styles.customcalender}
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
              />
            </div>
            <div className="d-flex align-items-center">
              <div className={`${styles.radiobutton}`}>
                <RadioButton value="Employed" name="employmentType" inputType="radioButton" label="Long Tem Rentals" />
              </div>

              <div className={`${styles.radiobutton}`}>
                <RadioButton value="Employed" name="employmentType" inputType="radioButton" label="Short Tem Rentals" />
              </div>
            </div>
          </Col>
          <Col lg="3" md="4" sm="6" xs="12" className="d-flex flex-column align-items-start mt-5 mb-5 mt-lg-0">
            <div className={styles["vertical-card"]}>
              <Link href="/">
                <div className={`d-flex align-items-center justify-content-start ${styles.cancel}`}>
                  <Cancel />
                  <span>Cancel</span>
                </div>
              </Link>

              <p>Your home</p>
              <img src={CartImg} alt="" />

              <div className="mt-4 mb-5">
                <div className="mt-2">
                  <Pin />
                  <span className="pl-3">Location:</span>
                </div>
                <div className="mt-2">
                  <Home />

                  <span className="pl-3">200 sqft</span>
                </div>
                <div className="mt-2">
                  <Bed />

                  <span className="pl-3">3 Beds</span>
                </div>
              </div>
              <div className="w-100">
                <Button font="17px">Next</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
export default NewOfferDate
