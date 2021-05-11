/**
 *
 * HeaderForm
 *
 */
import React, { useState } from "react";
import useWindowSize from "@Services/hooks/useWindowSize";
import { useRouter } from "next/router";

// components
import { Container, Row, Col } from "react-bootstrap";
import { filterHouseType } from "../../../../staticData/Listing/data";
import Button from "../../../../components/Button";
import Link from "@Components/Link";
import MobileForm from "@containers/Home/layouts/MobileForm";
import Select from "@Components/Select";

// svg
import Search from "./svg/search.svg";

// styles
import styles from "./styles/HeaderForm.module.scss";

// InterFaces
import { IHeaderForm } from "./HeaderForm";

export const HeaderForm: React.FunctionComponent<IHeaderForm.IProps> = () => {
  const [city, setCity] = useState<any>();
  const [type, setType] = useState<any>();
  const size: Number = useWindowSize();
  const router = useRouter();
  const HandleSearch = () => {
    var obj = { city: city, type: type };
    var json = JSON.stringify(obj);
    if (city !== undefined) {
      localStorage.setItem("info", json);
      console.log(obj);
      router.push("/listing");
    }
  };

  return (
    <Container
      data-wow-delay="1s"
      data-wow-duration="2s"
      className="p-0 wow bounceInRight"
    >
      <Row className="justify-content-center ">
        <Col
          lg={{ offset: 4, span: 8 }}
          md="11"
          sm="12"
          xs="12"
          className="d-flex justify-content-lg-end justify-content-center"
        >
          {size < 700 ? (
            <MobileForm />
          ) : (
            <form className={styles["hero-form"]}>
              <div className={styles["your-city-select"]}>
                <Select
                  selectOnChange={v => setCity(v)}
                  autocomplate
                  hasIcon={<Search />}
                  theme="dd-wrapper"
                  defaultSelected="Your City"
                />
              </div>

              <span className={styles.path} />
              <div className={styles["rent-select"]}>
                <Select
                  selectOnChange={v => setType(v)}
                  options={filterHouseType}
                  theme="dd-wrapper"
                  defaultSelected="Rent House"
                />
              </div>

              <Button
                theme="primary"
                size="md"
                height="37px"
                handleClick={() => HandleSearch()}
              >
                Search
              </Button>
            </form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HeaderForm;
