/**
 *
 * Employment
 *
 */
import React, { useState } from "react"

// InterFaces

// components
import { Container, Row, Col } from "react-bootstrap"
import Button from "@Components/Button"
import RadioButton from "@Components/RadioButton"
import Link from "@Components/Link"
import Input from "@Components/Input"
import { IEmployment } from "./Employment"

// styles
import styles from "./styles/AdditionalInfo.module.scss"

// assets
import Path from "./svg/path.svg"
import Cancel from "./svg/cancel.svg"
import CartImg from "./svg/image.png"
import Home from "./svg/home.svg"
import Pin from "./svg/pin.svg"
import Bed from "./svg/bed.svg"

export const Employment: React.FunctionComponent<IEmployment.IProps> = ({ changePageHandler }) => {
  const [EmployedOrStudent, setEmployedOrStudent] = useState<string>("Employed")
  return (
    <section className={`${styles.NewOffer} wow FadeInUp`}>
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
            className="d-flex flex-column  align-items-start mt-5 pt-5">
            <span className={styles.employment}>Employment type</span>
            <div className="d-flex align-items-center mt-3">
              <div className={`${styles.radiobutton}`}>
                <RadioButton
                  value="Employed"
                  isChecked={EmployedOrStudent === "Employed"}
                  handleChange={val => setEmployedOrStudent(val.target.value)}
                  name="employmentType"
                  inputType="radioButton"
                  label="Employed"
                />
              </div>
              <div className={`ml-5 ${styles.radiobutton}`}>
                <RadioButton
                  value="Student"
                  isChecked={EmployedOrStudent === "Student"}
                  handleChange={val => setEmployedOrStudent(val.target.value)}
                  name="employmentType"
                  inputType="radioButton"
                  label="Student"
                />
              </div>
              <div className={`ml-5 ${styles.radiobutton}`}>
                <RadioButton
                  value="Unemployed"
                  isChecked={EmployedOrStudent === "Unemployed"}
                  handleChange={val => setEmployedOrStudent(val.target.value)}
                  name="employmentType"
                  inputType="radioButton"
                  label="Unemployed"
                />
              </div>
            </div>

            <div className="w-75 mt-5">
              <Input type="text" theme="material" label="Company" />
            </div>
            <div className="w-75 mt-5">
              <Input type="text" theme="material" label="Job Title" />
            </div>
            <div className="w-75 mt-5">
              <Input type="text" theme="material" label="Gross Monthly Income" />
            </div>
            <div className="w-75 mt-5">
              <Input type="text" theme="material" label="Duration" />
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
                <Button
                  font="17px"
                  handleClick={() => {
                    changePageHandler(4)
                  }}>
                  Next
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Employment
