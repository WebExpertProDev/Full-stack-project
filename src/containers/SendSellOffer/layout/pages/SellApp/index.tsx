/**
 *
 * RentalApp
 *
 */
import React, { useState, useEffect } from "react";

// InterFaces

// components
import { Container, Row, Col } from "react-bootstrap";
import Button from "@Components/Button";
import Link from "@Components/Link";
import Input from "@Components/InputSendOffer";
import { ISellApp } from "./SellApp";
import * as filestack from "filestack-js";

// styles
import styles from "./styles/AdditionalInfo.module.scss";

// assets
import Path from "./svg/path.svg";
import Cancel from "./svg/cancel.svg";
import CartImg from "./svg/image.png";
import Home from "./svg/home.svg";
import Pin from "./svg/pin.svg";
import Bed from "./svg/bed.svg";
import Cencell from "./svg/cancell.svg";
import Document from "./svg/document.svg";

export const SellApp: React.FunctionComponent<ISellApp.IProps> = ({
  changePageHandler,
  curHouse,
  files,
  setFiles
}) => {
  const [f, setF] = useState<any>();
  const removeDoc = file => {
    setFiles(null);
  };

  const handleUpload = file => {
    setF(file);
    const client = filestack.init("https://www.filestackapi.com/api/file");
    client.upload(file).then(data => setFiles(data.url));
  };
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
            className="d-flex flex-column align-items-center justify-content-start mt-5 pt-5"
          >
            <div className="d-flex flex-wrap align-items-center justify-content-start w-100">
              <span className={styles.employment}>Documents (optional)</span>
              <div className="ml-2 mt-2 mt-lg-0 ">
                <Input
                  theme="outline"
                  type="file"
                  value={null}
                  accept={".pdf,.docx"}
                  label={"Browse or Drag File"}
                  change={e => handleUpload(e.target.files[0])}
                />
              </div>
            </div>

            <div className="d-flex align-items-center flex-wrap justify-content-start mr-auto mt-5 w-75 border p-2">
              <div
                className={`d-flex align-items-center justify-content-around flex-wrap w-100 ${styles["doc-row"]}`}
              ></div>
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
              <img src={curHouse.image[0]} alt="" />

              <div className="mt-4 mb-5">
                <div className="mt-2">
                  <Pin />
                  <span className="pl-3">
                    Location: {curHouse.streetAddress}
                  </span>
                </div>
                <div className="mt-2">
                  <Home />

                  <span className="pl-3">{curHouse.size} sqft</span>
                </div>
                <div className="mt-2">
                  <Bed />

                  <span className="pl-3">{curHouse.bedRoomCount} Bedrooms</span>
                </div>
              </div>
              <div className="w-100">
                <Button font="17px" handleClick={() => changePageHandler(3)}>
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

export default SellApp;
