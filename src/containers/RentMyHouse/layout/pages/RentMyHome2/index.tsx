import React, { useState } from "react"

import { Container, Row, Col } from "react-bootstrap"
import RadioButton from "@Components/RadioButton"
import RadialNumber from "@Components/RadialNumberInput"
import Button from "@Components/Button"
import Link from "@Components/Link"
import { IRentMyHome2 } from "./RentMyHome2"
// styles
import styles from "./styles/RentMyHome2.module.scss"

// assets
import Personsvg from "./svg/person.svg"
import Agent from "./svg/aganet.svg"
import Cancel from "./svg/cancel.svg"

export const index: React.FunctionComponent<IRentMyHome2.IProps> = ({ changePageHandler }) => {
  const [amount, setAmount] = useState<number>(30)
  const [beds, setbeds] = useState<number>(0)
  const [bathrooms, setbathrooms] = useState<number>(0)
  const [parking, setparking] = useState<number>(0)
  const [personOrAgent, setpersonOrAgent] = useState<string>("with-person")

  return (
    <section className="wow fadeInUp" data-wow-duration="1s">
      <Container fluid="lg" className="px-lg-0">
        <Row className="justify-content-center">
          <Col lg={{ span: 4, offset: 2 }} md="6" sm="6" xs="9">
            <span className={styles.header}>Enter home facts </span>
            <div className={styles.size}>
              <span>Enter Size :</span>

              <span className="ml-3 font-weight-bold">{`${amount} (sqft) `}</span>
            </div>
            <div>
              <input
                type="range"
                style={{
                  background: `linear-gradient(to right, #00bbd8 0%, #00bbd8 ${amount}%, #fff ${amount}%, #c7c7c7 0%)`,
                }}
                value={amount}
                className={styles.slider}
                onChange={e => {
                  const { value } = e.target
                  setAmount(Number(value))
                }}
              />
            </div>

            <div className={`d-flex flex-column align-items-start mt-5 ${styles.feature}`}>
              <div className="d-flex jestify-content-between w-100 mt-2">
                <span className="w-50">Beds</span>
                <span className="w-50">
                  <RadialNumber currentCount={beds} onChange={setbeds} max={15} />
                </span>
              </div>
              <div className="d-flex jestify-content-between w-100 mt-5">
                <span className="w-50">Bathroom</span>
                <span className="w-50">
                  <RadialNumber currentCount={bathrooms} onChange={setbathrooms} max={15} />
                </span>
              </div>
              <div className="d-flex jestify-content-between w-100 mt-5">
                <span className="w-50">Parking</span>
                <span className="w-50">
                  <RadialNumber currentCount={parking} onChange={setparking} max={15} />
                </span>
              </div>
            </div>
          </Col>
          <Col
            lg={{ span: 4, offset: 2 }}
            md={{ span: 4, offset: 1 }}
            sm="6"
            xs="9"
            className="d-flex mb-lg-0 mb-sm-0 mb-md-0 mb-5
             flex-column align-items-lg-center align-items-md-center align-items-sm-center align-items-start justify-content-between">
            <div
              className={`d-flex flex-column align-items-start border-left mb-5 pl-lg-5 pl-3 ${styles["radio-wrapper"]}`}>
              <div className={styles["radio-button"]}>
                <RadioButton
                  name="hamid"
                  handleChange={val => setpersonOrAgent(val.target.value)}
                  isChecked={personOrAgent === "with-person"}
                  value="with-person"
                  inputType="radioButton"
                  label="In person with Ai"
                  hasIcon={<Personsvg />}
                />
              </div>
              <div className={`mt-4 ${styles["radio-button"]}`}>
                <RadioButton
                  handleChange={val => setpersonOrAgent(val.target.value)}
                  isChecked={personOrAgent === "with-agent"}
                  value="with-agent"
                  name="hamid"
                  inputType="radioButton"
                  label="With agent and Ai"
                  hasIcon={<Agent />}
                />
              </div>
            </div>

            <div className={`d-flex flex-column justify-content-end ${styles.nextBtn}`}>
              <Button handleClick={() => changePageHandler(2)}>Next</Button>
              <Link href="/">
                <div className="d-flex justify-content-start laign-items-center mt-4">
                  <Cancel />
                  <span className={`ml-2 ${styles.cancel}`}>cancel</span>
                </div>
              </Link>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center" />
      </Container>
    </section>
  )
}

export default index
