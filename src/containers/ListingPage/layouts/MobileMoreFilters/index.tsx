/**
 *
 * MobileMoreFilters
 *
 */
import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Button from "@Components/Button";
// InterFaces
import { IMobileMoreFilters } from "./MobileMoreFilters";

// styles
import styles from "./styles/MobileMoreFilter.module.scss";

// svg
import AirCondition from "../MoreFilters/svg/filter/Airconditioning.svg";
import Balcony from "../MoreFilters/svg/filter/Balcon.svg";
import Barbecue from "../MoreFilters/svg/filter/Barbecue.svg";
import Bicycle from "../MoreFilters/svg/filter/Bicycle.svg";
import Elevator from "../MoreFilters/svg/filter/Elevator.svg";
import Floors from "../MoreFilters/svg/filter/Floors.svg";
import Gym from "../MoreFilters/svg/filter/Gym.svg";
import Landry from "../MoreFilters/svg/filter/Landry.svg";
import Parking from "../MoreFilters/svg/filter/Parking.svg";
import Pet from "../MoreFilters/svg/filter/Pet.svg";
import Pool from "../MoreFilters/svg/filter/pool.svg";
import Reconstructed from "../MoreFilters/svg/filter/Reconstructed.svg";
import Security from "../MoreFilters/svg/filter/Security.svg";
import Furnished from "../MoreFilters/svg/filter/Furnished.svg";

import { filters } from "../../../../staticData/common/data";

export const MobileMoreFilters: React.FunctionComponent<IMobileMoreFilters.IProps> = ({
  setfilterOptions,
  submitFilter
}) => {
  const [selectedItem, setselectedItem] = useState<any>([]);
  const [options, setOptions] = useState(filters);

  const selectItem = item => {
    // de Select Item
    const existed = selectedItem.filter(i => i.title === item.title);
    let curentItems;

    if (existed.length !== 0) {
      curentItems = selectedItem.filter(i => i.title !== item.title);
      setselectedItem(curentItems);
    } else {
      // add Item
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

  useEffect(() => {
    setfilterOptions("utilities", options);
  }, [options]);

  const firstCol = filters.slice(0, 7);
  const secondCol = filters.slice(7, 14);
  return (
    <div className={styles["mobile-more-filters"]}>
      <Container>
        <Row className="mt-4">
          <Col xs="6">
            <div className={styles.leftColumn}>
              {firstCol.map((filter, index) => (
                <div
                  key={index}
                  className={
                    filter.status ? styles.morefilteractive : styles.morefilter
                  }
                  onClick={() => selectItem(filter)}
                >
                  <filter.svg />
                  <span className="pl-3">{filter.title}</span>
                </div>
              ))}
            </div>
          </Col>
          <Col xs="6">
            {secondCol.map((filter, index) => (
              <div
                key={index}
                className={
                  filter.status ? styles.morefilteractive : styles.morefilter
                }
                onClick={() => selectItem(filter)}
              >
                <filter.svg />
                <span className="pl-3">{filter.title}</span>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
      <div className={styles["more-filter-btn"]}>
        <Button
          theme="primary"
          size="lg"
          borderRadius="0px"
          handleClick={() => submitFilter()}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default MobileMoreFilters;
