/**
 *
 * Description
 *
 */
import React from "react";

// InterFaces
import { Container, Col, Row } from "react-bootstrap";
import { IDescription } from "./Description";

// assets
import Bed from "./svg/bed.svg";
import Home from "./svg/home.svg";
import Bath from "./svg/bath.svg";
import Seprator from "./svg/Seperator.svg";
import Reload from "./svg/reload.svg";

// styles
import styles from "./styles/Description.module.scss";

export const Description: React.FunctionComponent<IDescription.IProps> = ({
  detail
}) => {
  // detail.overview = {}; // remove this!!!
  // detail.historyPrice = [1,2,3]; // remove this!!!
  const description = {
    description: detail.description,
    bedroomCount: detail.overview.bedroomCount,
    bathroomCount: detail.overview.bathroomCount,
    size: detail.overview.size,
    views: detail.views,
    dateListed: detail.dateListed
  };

  // hard code data starts
  // description.description = "Shannon Wall Centre! This luxury Concrete condo offers a perfect modern open layout. Floor to ceiling windows offers lots of sunshine into the unit, facing east into the gardens ensure privacy. This unit features high end SS appliances, Geothermal heating system and engineered hardwood flooring throughout."
  // description.bathroomCount = "3";
  // description.bedroomCount = "1";
  // description.views = "1";
  // description.size = "500";
  // description.dateListed = "2021/03/01";
  // hard code data ends
  const dateDiff = Math.ceil(
    Math.abs(
      new Date(description.dateListed).getTime() - new Date().getTime()
    ) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <section id="propertyDetails" className={styles["description-section"]}>
      <Container fluid="lg" className="p-lg-0">
        <Row>
          <Col
            lg={8}
            md="8"
            sm="12"
            xs="12"
            className={`d-flex justify-content-lg-start  justify-content-md-start  
          justify-content-center align-items-center  ${styles["feature-left"]}`}
          >
            <div className="d-flex align-items-center">
              <Bed className={styles.svgIcon} />
              <span className="ml-lg-2 ml-1 ">
                {description.bedroomCount} Beds
              </span>
            </div>

            <div className="d-flex align-items-center">
              <Seprator />
              <Bath className={`ml-lg-3 ml-1 ${styles.svgIcon}`} />
              <span className="ml-lg-2 ml-1">
                {description.bathroomCount} Baths
              </span>
            </div>
            <div className="d-flex align-items-center">
              <Seprator />
              <Home className={`ml-lg-3 ml-1 ${styles.svgIcon}`} />
              <span className="ml-lg-2 ml-1">{description.size} sqft</span>
            </div>
          </Col>
          <Col
            lg={4}
            md="4"
            sm="12"
            xs="12"
            className={`d-flex justify-content-lg-end justify-content-md-end 
          justify-content-center mt-4 mt-lg-0 mt-md-0 ${styles["feature-right"]}`}
          >
            <Reload />
            <span className="ml-1">
              Last Modified: {dateDiff} days ago - {description.views} views
            </span>
          </Col>
        </Row>
        <Row>
          <Col lg={12} className={styles.description}>
            <p>{description.description}</p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Description;
