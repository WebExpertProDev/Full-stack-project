/**
 *
 * NeadrBy
 *
 */
import React, { useState } from "react";
import classNames from "classnames";

// components
import Button from "@Components/Button";
import Input from "@Components/Input";
import InputRadio from "@Components/RadioButton";
import Select from "@Components/Select";
import Link from "@Components/Link";
// Static Data
import chunk from "@utils/chunk";
import { Container, Row, Col } from "react-bootstrap";
import { NearByItems } from "../../../../../staticData/common/data";

// styles
import styles from "./styles/NearBy.module.scss";
// InterFaces
import { INeadrBy } from "./NeadrBy";

// assets
import Cancel from "./svg/cancel.svg";
import Search from "./svg/search.svg";

export const NeadrBy: React.FunctionComponent<INeadrBy.IProps> = ({
  changePageHandler,
  homeInfo,
  setHomeInfo
}) => {
  const [search, setsearch] = useState<string>("");
  const [selectedItem, setselectedItem] = useState<any>([]);
  const [options, setOptions] = useState(NearByItems);
  const filteredSuggestions = NearByItems.filter(
    option => option.title.toLowerCase().indexOf(search.toLowerCase()) > -1
  );
  console.log(homeInfo);
  const rows = chunk(options, 5);
  const searchHandler = value => {
    if (value.length === 0) {
      setsearch(value);
      setOptions(NearByItems);
      return true;
    }

    setOptions(filteredSuggestions);
    setsearch(value);
    return true;
  };

  const selectItem = item => {
    // de Select Item
    console.log(item);
    const existed = selectedItem.filter(i => i.title === item.title);
    let curentItems;

    if (existed.length !== 0) {
      curentItems = selectedItem.filter(i => i.title !== item.title);
      setselectedItem(curentItems);
      if (item.title === "School") {
        const inputItems = [];
        setHomeInfo({
          ...homeInfo,
          nearby: {
            ...homeInfo.nearby,
            School: inputItems
          }
        });
      } else if (item.title === "Bank") {
        const inputItems = [];
        setHomeInfo({
          ...homeInfo,
          nearby: {
            ...homeInfo.nearby,
            Bank: inputItems
          }
        });
      } else if (item.title === "Restaurant" || item.title === "CAFE") {
        const inputItems = homeInfo.nearby.Foodservice;
        inputItems.filter(i => i !== item.title);
        console.log(inputItems);
        console.log("hi" + homeInfo.nearby.Foodservice);
        setHomeInfo({
          ...homeInfo,
          nearby: {
            ...homeInfo.nearby,
            Foodservice: inputItems
          }
        });
      } else if (item.title === "Park" || item.title === "Dog parks") {
        const inputItems = homeInfo.nearby.Parks;
        inputItems.filter(i => i !== item.title);
        setHomeInfo({
          ...homeInfo,
          nearby: {
            ...homeInfo.nearby,
            Parks: inputItems
          }
        });
      } else if (item.title === "Shopping" || item.title === "Grocery") {
        const inputItems = homeInfo.nearby.Stores;
        inputItems.filter(i => i !== item.title);
        setHomeInfo({
          ...homeInfo,
          nearby: {
            ...homeInfo.nearby,
            Stores: inputItems
          }
        });
      } else {
        const inputItems = homeInfo.nearby.Others;
        inputItems.filter(i => i !== item.title);
        setHomeInfo({
          ...homeInfo,
          nearby: {
            ...homeInfo.nearby,
            Others: inputItems
          }
        });
      }
    } else {
      // add Item
      const items = selectedItem;
      items.push(item);
      setselectedItem(items);
      if (item.title === "School") {
        const inputItems = ["School"];
        setHomeInfo({
          ...homeInfo,
          nearby: {
            ...homeInfo.nearby,
            School: inputItems
          }
        });
      } else if (item.title === "Bank") {
        const inputItems = ["Bank"];
        setHomeInfo({
          ...homeInfo,
          nearby: {
            ...homeInfo.nearby,
            Bank: inputItems
          }
        });
      } else if (item.title === "Restaurant" || item.title === "CAFE") {
        const inputItems = homeInfo.nearby.Foodservice;
        inputItems.push(item.title);
        console.log(inputItems);
        console.log(homeInfo.nearby.Foodservice);
        setHomeInfo({
          ...homeInfo,
          nearby: {
            ...homeInfo.nearby,
            Foodservice: inputItems
          }
        });
      } else if (item.title === "Park" || item.title === "Dog parks") {
        const inputItems = homeInfo.nearby.Parks;
        inputItems.push(item.title);
        setHomeInfo({
          ...homeInfo,
          nearby: {
            ...homeInfo.nearby,
            Parks: inputItems
          }
        });
      } else if (item.title === "Shopping" || item.title === "Grocery") {
        const inputItems = homeInfo.nearby.Stores;
        inputItems.push(item.title);
        setHomeInfo({
          ...homeInfo,
          nearby: {
            ...homeInfo.nearby,
            Stores: inputItems
          }
        });
      } else {
        const inputItems = homeInfo.nearby.Others;
        inputItems.push(item.title);
        setHomeInfo({
          ...homeInfo,
          nearby: {
            ...homeInfo.nearby,
            Others: inputItems
          }
        });
      }
    }

    // change option
    const soptions = options.map(i => {
      if (i.title === item.title) {
        i.status = !i.status;
      }
      return i;
    });

    setOptions(soptions);
  };
  const [longOrShort, setlongOrShort] = useState<string>("Long");
  return (
    <section className="wow fadeInUp">
      <Container fluid="lg" className="px-lg-0">
        <Row className="justify-content-center ">
          <Col lg="9" md="12" sm="12" xs="11" className={styles.warpperinput}>
            <p className={styles.title}>Nearby</p>
            <Input
              value={search}
              change={value => searchHandler(value)}
              theme="default"
              type="text"
              hasIcon={<Search />}
            />
          </Col>
        </Row>
        <Row className="justify-content-center ">
          {rows.map(cols => (
            <Col lg="3" md="4" sm="4" xs="11" className={`${styles.Nearby}`}>
              {cols.map((NearBy, index) => (
                <div
                  onKeyPress={() => selectItem(NearBy)}
                  role="button"
                  tabIndex={-1}
                  onClick={() => selectItem(NearBy)}
                  key={index}
                >
                  <div className={styles["selectInput"]}>
                    <input type="checkbox" />
                    <label className={styles.label}>{NearBy.title}</label>
                  </div>
                </div>
              ))}
            </Col>
          ))}
        </Row>
        <Row className="justify-content-center mt-5">
          <Col lg="6" md="8" sm="7" xs="11" className={styles.utility}>
            {/* <div className="d-flex flex-wrap  w-100">
              <div className={`${styles.inputSpan} mb-2 mb-lg-0 mb-md-0`}>
                <InputRadio
                  name="temRentals"
                  value="long"
                  isChecked={longOrShort === "long"}
                  handleChange={val => setlongOrShort(val.target.value)}
                  inputType="radioButton"
                  label="Long Tem Rentals"
                />
              </div>
              <div className={`${styles.inputSpan} ml-lg-5 ml-md-5 ml-0`}>
                <InputRadio
                  name="temRentals"
                  value="short"
                  handleChange={val => setlongOrShort(val.target.value)}
                  isChecked={longOrShort === "short"}
                  inputType="radioButton"
                  label="Short Tem Rentals"
                />
              </div>
            </div>
            <div className={`mt-4 ${styles["input-form"]}`}>
              <Select
                defaultSelected="Monthly"
                theme="dd-wrapper-secondary"
                options={rentOptions}
                selectOnChange={v => setRentType(v.title)}
              />
            </div> */}
          </Col>
          <Col lg="3" md="4" sm="5" xs="11">
            <div className={styles.nextbtn}>
              <Button handleClick={() => changePageHandler(6)}>Next</Button>
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

export default NeadrBy;
