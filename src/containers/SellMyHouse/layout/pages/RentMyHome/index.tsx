/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from "react"

import { Container, Row, Col } from "react-bootstrap"
import RadioButton from "@Components/RadioButton"
import Button from "@Components/Button"
import { IRentMyHome } from "./RentMyHome"
// import Modal from '../Modal';

// styles
import styles from "./styles/RentMyHome.module.scss"

// assets
import Personsvg from "./svg/person.svg"
import Agent from "./svg/aganet.svg"

export const index: React.FunctionComponent<IRentMyHome.IProps> = ({ changePageHandler }) => {
  const [personOrAgent, setpersonOrAgent] = useState<string>("with-person")

  return (
    <section className="wow fadeInUp" data-wow-duration="1s">
      <Container>
        <Row className="justify-content-center">
          <Col lg="4">
            <span className={`d-flex justify-content-start ${styles.header}`}>Would the method you choose?</span>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg="4" className={`d-flex flex-column align-items-start ${styles.radioButton}`}>
            <div className={styles["radio-button"]}>
              <RadioButton
                handleChange={val => setpersonOrAgent(val.target.value)}
                isChecked={personOrAgent === "with-person"}
                value="with-person"
                inputType="radioButton"
                name="chooseMethod"
                label="In person with Ai"
                hasIcon={<Personsvg />}
              />
            </div>
            <div className={`mt-4 ${styles["radio-button"]}`}>
              <RadioButton
                handleChange={val => setpersonOrAgent(val.target.value)}
                isChecked={personOrAgent === "with-agent"}
                value="with-agent"
                inputType="radioButton"
                name="chooseMethod"
                label="With agent and Ai"
                hasIcon={<Agent />}
              />
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg="5" className={`d-flex flex-column ${styles["text-area"]}`}>
            <span>Title</span>
            <label htmlFor="title">Max 200 Characters</label>
            <textarea id="title" autoFocus />
          </Col>
        </Row>

        <Row className="d-flex justify-content-center pt-5">
          <Col sm="5">
            <div className={`d-flex flex-column justify-content-end ${styles.nextBtn}`}>
              <Button handleClick={() => changePageHandler(1)}>Next</Button>
            </div>
          </Col>
        </Row>
      </Container>
      {/* <Modal /> */}
    </section>
  )
}

export default index
