/**
 *
 * Overview
 *
 */
import React, {useState} from 'react';
// import MediaQuery from "react-responsive"
// components
import Button from "@Components/Button";
import CheckoutForm from "@Components/Checkout/CheckoutForm";

// styles
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles/Overview.module.scss";

// assets
import Path from './svg/path.svg';
import Starr from './svg/star.svg';
import Share from './svg/share.svg';
import Fav from './svg/fav.svg';
import { useRouter } from 'next/router';
// InterFaces
import { IOverview } from "./Overview";


export const Overview: React.FunctionComponent<IOverview.IProps> = () => {

  const [address, setAddress] = useState<string>("Vancouver, BC V6P 0H5 - 1561 W 57th Ave #307");
  const [streetAddress, setStreetAddress] = useState<string>("1561 W 57th Ave #307");
  //please separate complete address and street address
  const router = useRouter();
  const BookTour=()=>{
    localStorage.setItem("HomeAddress", streetAddress)
    localStorage.setItem("PostalCode", "V6P 0H5")
    localStorage.setItem("Provience", "BC")
    localStorage.setItem("City", "Vancouver")
    router.push('/request-tour')
    return;
  }

  return(
  <>
    <section className={`py-2 ${styles["overview-title-section"]}`}>
      <Container fluid="lg" className="p-lg-0">
        <div className="d-flex aling-items-center">
          <Path />
          <span className={`pt-2 ml-2 ${styles.title}`}>{address}</span>
        </div>
      </Container>
    </section>
    <section className={styles["overview-section"]}>
      <Container fluid="lg" className="p-lg-0 ">
        <Row className="d-flex align-items-center">
          <Col
            lg="8"
            md="10"
            sm="12"
            className={`d-flex flex-wrap justify-content-lg-start justify-content-center mx-auto ${styles["btn-group"]}`}
          >
            <div className={styles["share-btn"]}>
              <Button
                theme="outline-gray"
                size="md"
                height="48px"
                font="15px"
                fontFamily="Regular"
                hasIcon={<Share />}
              >
                Copy Share link
              </Button>
            </div>
            <div className={styles["favorite-btn"]}>
              <Button
                theme="outline-gray"
                size="md"
                height="48px"
                font="15px"
                fontFamily="Regular"
                hasIcon={<Fav />}
              >
                Add to Favorites
              </Button>
            </div>
            <div className={styles['schedule-btn']}>
              <Button theme="primary" size="md" height="50px" font="17px" fontFamily="SemiBoldFont" handleClick={BookTour}>
                Schedule a Tour
              </Button>
            </div>
          </Col>
          <Col
            lg="4"
            md="12"
            className="d-flex justify-content-lg-end justify-content-center mt-4 mt-lg-0"
          >
            <div className={styles["total-price"]}>
              <span className={styles.title}>Total Price</span>
              <span className={styles.price}>$1,749,000 </span>
              <div className={`d-flex align-items-center ${styles.status}`}>
                <Starr />
                <span className="pl-2">Fair Price</span>
              </div>
              <CheckoutForm amount="1749000" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  </>
  )};

export default Overview;
