/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import classNames from "classnames";

import { Container, Row, Col } from "react-bootstrap";
import Button from "@Components/Button";
import Input from "@Components/Input";
import InputRadio from "@Components/RadioButton";
import Link from "@Components/Link";
// static data
import chunk from "@utils/chunk";
import { IChooseFeature } from "./ChooseFeature";
import { filters } from "../../../../../staticData/common/data";

// styles
import styles from "./styles/ChooseFeature.module.scss";

// assets
import Cancel from "./svg/cancel.svg";
import Search from "./svg/search.svg";
import PlusIcon from "./svg/plus.svg";
const index: React.FunctionComponent<IChooseFeature.IProps> = ({
  changePageHandler,
  homeInfo,
  setHomeInfo
}) => {
  const [search, setsearch] = useState<string>("");
  const [selectedItem, setselectedItem] = useState<any>([]);
  const [myFeature, setMyFeatures] = useState<any>([]);
  const [options, setOptions] = useState(filters);
  const filteredSuggestions = filters.filter(
    option => option.title.toLowerCase().indexOf(search.toLowerCase()) > -1
  );
  console.log(homeInfo);
  const rows = chunk(options, 5);
  const moreRows = chunk(myFeature, myFeature.length / 3).reverse();
  // console.log(selectedItem)
  const [haveHydro, setHydro] = useState<boolean>(false);
  const [haveHeat, setHeat] = useState<boolean>(false);
  const [haveWater, setWater] = useState<boolean>(false);
  const [haveTV, setTV] = useState<boolean>(false);
  const [haveInternet, setInternet] = useState<boolean>(false);
  const [extraTag, setExtraTag] = useState<string>("");
  const update = () => {
    // console.log("clicked")
    var tags = "";
    for (var i = 0; i < myFeature.length; i++) {
      tags = tags + myFeature[i].title + ", ";
    }
    tags = tags.substring(0, tags.length - 2);
    //console.log(tags)
    setHomeInfo({
      ...homeInfo,
      utilities: {
        hydro: haveHydro,
        heat: haveHeat,
        gas: haveWater,
        electricity: haveInternet,
        tvOrCable: haveTV
      },
      propertyFeatures: {
        ...homeInfo.propertyFeatures,
        more: tags
      }
    });
    changePageHandler(5);
  };
  const removeItem = filter => {
    let curentItems = myFeature.filter(i => i.title !== filter.title);
    setMyFeatures(curentItems);
  };
  const addFeature = () => {
    if (extraTag != "") {
      const featureArr = myFeature;
      featureArr.push({ title: extraTag, status: true });
      setExtraTag("");
      setMyFeatures(featureArr);
    }
  };
  const searchHandler = value => {
    if (value.length === 0) {
      setsearch(value);
      setOptions(filters);
      return true;
    }

    setOptions(filteredSuggestions);
    setsearch(value);
    return true;
  };

  const selectItem = item => {
    // de Select Item
    const existed = selectedItem.filter(i => i.title === item.title);
    let curentItems;

    if (existed.length !== 0) {
      curentItems = selectedItem.filter(i => i.title !== item.title);
      setselectedItem(curentItems);
      setHomeInfo({
        ...homeInfo,
        propertyFeatures: {
          ...homeInfo.propertyFeatures,
          [item.schematitle]: false
        }
      });
    } else {
      // add Item
      setHomeInfo({
        ...homeInfo,
        propertyFeatures: {
          ...homeInfo.propertyFeatures,
          [item.schematitle]: true
        }
      });
      const items = selectedItem;
      items.push(item);
      setselectedItem(items);
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

  return (
    <section className="wow fadeInUp">
      <Container fluid="lg" className="px-lg-0">
        <Row className="justify-content-center ">
          <Col lg="9" xs="11" className={styles.warpperinput}>
            <p className={styles.title}>Property features</p>
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
            <Col lg="3" md="4" sm="4" xs="11" className={`${styles.filters}`}>
              {cols.map((filter, index) => (
                <div
                  onKeyPress={() => selectItem(filter)}
                  role="button"
                  tabIndex={-1}
                  onClick={() => selectItem(filter)}
                  key={index}
                  className={classNames("mt-3", {
                    [styles.selected]: filter.status
                  })}
                >
                  <filter.svg />
                  <span className="pl-lg-4 pl-2">{filter.title}</span>
                </div>
              ))}
            </Col>
          ))}
        </Row>
        <Row className="justify-content-center ">
          {moreRows.map(cols => (
            <Col
              lg="3"
              md="4"
              sm="4"
              xs="11"
              className={`${styles.filters} ${styles["add-more-item"]}`}
            >
              {cols.map((filter, index) => (
                <div
                  role="button"
                  tabIndex={-1}
                  onClick={() => removeItem(filter)}
                  key={index}
                  className={classNames("mt-3", {
                    [styles.selected]: filter.status
                  })}
                >
                  {/* <Extra className={`${styles.svg}`}/>
                   */}
                  <PlusIcon />
                  <span className="pl-lg-4 pl-2">{filter.title}</span>
                </div>
              ))}
            </Col>
          ))}
        </Row>
        <Row className="justify-content-center ">
          <Col
            lg="9"
            md="12"
            sm="12"
            xs="11"
            className={`d-flex align-items-center mt-3  ${styles["add-more-item"]}`}
          >
            <PlusIcon onClick={addFeature} />
            {/* <Input 
            
                  change={v => setExtraTag(v)}
                  value={extraTag}
                  theme="default"
                  type="text"
                  id="Extra"
                  placeholder="Add more option"
                /> */}
            <input
              type="text"
              onChange={e => {
                let v = e.target.value;
                setExtraTag(v);
              }}
              value={extraTag}
              className={styles.extra}
              placeholder="Add More Option"
            ></input>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col lg="6" xs="11" className={styles.utility}>
            <span>Utilities included</span>
            <div className="d-flex justify-content-between flex-wrap w-100 mt-3">
              <div className={styles.selectInput}>
                <input type="checkbox" onClick={() => setHydro(!haveHydro)} />
                <p>Hydro</p>
              </div>
              <div className={styles.selectInput}>
                <input type="checkbox" onClick={() => setHeat(!haveHeat)} />
                <p>Heat</p>
              </div>
              <div className={styles.selectInput}>
                <input type="checkbox" onClick={() => setWater(!haveWater)} />
                <p>Gas</p>
              </div>
              <div className={styles.selectInput}>
                <input type="checkbox" onClick={() => setTV(!haveTV)} />
                <p>TV/Cable</p>
              </div>
              <div className={styles.selectInput}>
                <input
                  type="checkbox"
                  onClick={() => setInternet(!haveInternet)}
                />
                <p>Electricity</p>
              </div>
            </div>
          </Col>
          <Col lg="3" md="4" sm="8" xs="11" className="mb-4">
            <div className={`${styles.nextbtn}`}>
              <Button handleClick={update}>Next</Button>
              <Link href="/">
                <div
                  className={`${styles.cancel} d-flex align-items-center mt-3`}
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
export default index;
