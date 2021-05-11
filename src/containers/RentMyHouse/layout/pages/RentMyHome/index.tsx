/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import RadioButton from "@Components/RadioButton";
import Button from "@Components/Button";
import { IRentMyHome } from "./RentMyHome";
import Modal from "../Modal";

// styles
import styles from "./styles/RentMyHome.module.scss";

// assets
import Personsvg from "./svg/person.svg";
import Agent from "./svg/aganet.svg";

export const index: React.FunctionComponent<IRentMyHome.IProps> = ({
  changePageHandler,
  homeInfo,
  setHomeInfo
}) => {
  //  console.log(homeInfo);
  const [description, setDescription] = useState<string>("");
  const handleChange = event => {
    setDescription(event.target.value);
  };

  const update = () => {
    if (description == "") {
      setHomeInfo({ ...homeInfo, description: "House for rent" });
    } else {
      setHomeInfo({ ...homeInfo, description: description });
    }
    console.log(homeInfo);
    changePageHandler(1);
  };
  return (
    <section className="wow fadeInUp" data-wow-duration="1s">
      <Container>
        <Row className="justify-content-center">
          <Col lg="4">
            <span className={`d-flex justify-content-start ${styles.header}`}>
              Would the method you choose?
            </span>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col
            lg="4"
            className={`d-flex flex-column align-items-start ${styles.radioButton}`}
          >
            <div className={styles["radio-button"]}>
              <RadioButton
                handleChange={() =>
                  setHomeInfo({ ...homeInfo, hasAIAndAgent: false })
                }
                isChecked={homeInfo.hasAIAndAgent === false}
                value="with-person"
                inputType="radioButton"
                name="chooseMethod"
                label="In person with Ai"
                hasIcon={<Personsvg />}
              />
            </div>
            <div className={`mt-4 ${styles["radio-button"]}`}>
              <RadioButton
                handleChange={() =>
                  setHomeInfo({ ...homeInfo, hasAIAndAgent: true })
                }
                isChecked={homeInfo.hasAIAndAgent === true}
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
            <textarea id="title" autoFocus onChange={handleChange}>
              {homeInfo.description}
            </textarea>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center pt-5">
          <Col sm="5">
            <div
              className={`d-flex flex-column justify-content-end ${styles.nextBtn}`}
            >
              <Button handleClick={update} disabled={description == ""}>
                Next
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal />
    </section>
  );
};

export default index;
