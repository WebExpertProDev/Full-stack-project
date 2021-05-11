/* eslint-disable object-curly-newline */
/**
 *
 * Feature
 *
 */
import React, { useState } from "react";

// InterFaces
import { Container, Col, Row, Tab, Tabs } from "react-bootstrap";
import { IFeature } from "./Feature";

// styles
import styles from "./styles/Feature.module.scss";

// assets
import Basement from "./svg/basement.svg";
import Pool from "./svg/pool.svg";
import Parking from "./svg/parking.svg";
import Yearbuilt from "./svg/yearbuilt.svg";
import View from "./svg/view.svg";
import Property from "./svg/property.svg";
import Nextsvg from "./svg/next.svg";
import Backsvg from "./svg/back.svg";
import Airconditioning from "./svg/airconditioning.svg";
import Balcony from "./svg/balcony.svg";
import Bbq from "./svg/bbq.svg";
import Bicycleparking from "./svg/bicycleparking.svg";
import Elevator from "./svg/elevator.svg";
import Ensuitlandry from "./svg/ensuitlandry.svg";
import Furnished from "./svg/furnished.svg";
import Garden from "./svg/garden.svg";
import Gym from "./svg/gym.svg";
import Hardwoodfloors from "./svg/hardwoodfloors.svg";
import Next from "./svg/next.svg";
import Back from "./svg/back.svg";
import Petfriendly from "./svg/petfriendly.svg";
import Reconstructed from "./svg/reconstructed.svg";
import Securitysystem from "./svg/securitysystem.svg";
import Swimmingpool from "./svg/swimmingpool.svg";

const Components = {
  Basement,
  Pool,
  Parking,
  Yearbuilt,
  View,
  Property,
  Nextsvg,
  Backsvg,
  Airconditioning,
  Balcony,
  Bbq,
  Bicycleparking,
  Elevator,
  Ensuitlandry,
  Furnished,
  Garden,
  Gym,
  Hardwoodfloors,
  Next,
  Back,
  Petfriendly,
  Reconstructed,
  Securitysystem,
  Swimmingpool
};

import Detail from "@containers/Detail";

const Feature: React.FunctionComponent<IFeature.IProps> = ({ detail }) => {
  // detail.overview = {}; // remove this!!!
  // detail.historyPrice = [1,2,3]; // remove this!!!
  const feature = {
    overview: detail.overview,
    propertyFeatures: detail.propertyFeatures,
    utilities: detail.utilities,
    nearby: detail.nearby
  };
  // hard code data starts
  // feature.overview = {propertyType: "Condo", yearBuilt: "2012", size: "5000 ft.", bedroomCount: "2", bathroomCount: "2", parkingCount: "2"};
  // feature.propertyFeatures = { swimmingPool: true, elevator: true };
  // feature.nearby = { School: ["School1", "School2", "School3"], Bank: ["Bank1", "Bank2", "Bank3"], Foodservice: ["Foodservice1", "Foodservice2", "Foodservice3"], Parks: [], Stories: [], Others: [] };
  // feature.utilities = { hydro: true, heat: true, water: false, internet: false, tvOrCable: false }
  // hard code data ends

  const { overview, propertyFeatures, utilities, nearby } = feature;

  const splitByRow = items =>
    items.reduce(function(accumulator, currentValue, currentIndex, array) {
      if (currentIndex % 2 === 0)
        accumulator.push(array.slice(currentIndex, currentIndex + 2));
      return accumulator;
    }, []);

  const [MoreFeature, setMoreFeature] = useState(false);

  const textFormatter = txt => {
    txt = txt[0].toUpperCase() + txt.slice(1);
    for (let i = 1; i < txt.length; i++) {
      if (txt[i] == txt[i].toUpperCase()) {
        return txt.slice(0, i) + " " + txt.slice(i);
      }
    }
    return txt;
  };

  const svgTextFormatter = txt => {
    return txt[0].toUpperCase() + txt.slice(1).toLowerCase();
  };

  let numRendered = 0;
  const reachMaxRendered = () => {
    if (numRendered >= 5) {
      return MoreFeature;
    }
    numRendered++;
    return true;
  };

  return (
    <section className={styles["feature-section"]}>
      <Container fluid="lg" className="p-lg-0">
        <Row>
          <Col lg={5} md="5" sm="12">
            <div id="facts" className={styles.feature}>
              <span className={styles.title}>Features</span>
              <ul className={styles.details}>
                {/* {Object.entries(overview).map(item => {
                  const [key, val] = item;
                  return (<div className="d-flex align-items-center">
                            <Property />
                            <span className="ml-2">{textFormatter(key)}: {val}</span>
                          </div>)
                })} */}
                {overview.propertyType && reachMaxRendered() && (
                  <li>
                    <div className="d-flex align-items-center">
                      <Property />
                      <span className="ml-2">
                        Property Type: {overview.propertyType}
                      </span>
                    </div>
                  </li>
                )}

                {overview.yearBuilt && reachMaxRendered() && (
                  <li>
                    <div className="d-flex align-items-center">
                      <Yearbuilt />
                      <span className="ml-2">
                        Year Built: {overview.yearBuilt}
                      </span>
                    </div>
                  </li>
                )}

                {overview.parkingCount && reachMaxRendered() && (
                  <li>
                    <div className="d-flex align-items-center">
                      <Parking />
                      <span className="ml-2">
                        Parking Spaces: {overview.parkingCount}
                      </span>
                    </div>
                  </li>
                )}

                {Object.entries(propertyFeatures).map(item => {
                  const [key, val] = item;
                  const Svg = Components[svgTextFormatter(key)];
                  return (
                    key != "more" &&
                    val &&
                    reachMaxRendered() && (
                      <li>
                        <div className="d-flex align-items-center">
                          <Svg />
                          <span className="ml-2">{textFormatter(key)}</span>
                        </div>
                      </li>
                    )
                  );
                })}

                {propertyFeatures.more.length > 0 && (
                  <li>
                    <div className="d-flex align-items-center">
                      <span className="ml-2">
                        {"More: " + propertyFeatures.more}
                      </span>
                    </div>
                  </li>
                )}

                {Object.entries(utilities).map(item => {
                  const [key, val] = item;
                  return (
                    val &&
                    reachMaxRendered() && (
                      <li>
                        <div className="d-flex align-items-center">
                          {/* <Property /> */}
                          <span className="ml-2">{textFormatter(key)}</span>
                        </div>
                      </li>
                    )
                  );
                })}
              </ul>

              <div
                role="button"
                tabIndex={-1}
                onKeyDown={() => {
                  setMoreFeature(!MoreFeature);
                }}
                onClick={() => {
                  setMoreFeature(!MoreFeature);
                }}
                className={`d-flex align-items-center align-items-center ${styles.readmore}`}
              >
                {MoreFeature ? (
                  <>
                    <Backsvg className="mr-2" />
                    <span>read less</span>
                  </>
                ) : (
                  <>
                    <span>read more</span>

                    <Nextsvg className="ml-2" />
                  </>
                )}
              </div>
            </div>
          </Col>
          <Col lg={7} md="7" sm="12" className="mt-5 mt-lg-0 mt-md-0">
            <div className={styles.nearby} id="public">
              <span className={styles.title}>Nearby</span>

              <Tabs bsPrefix={styles.tab} id="controlled-tab-example">
                {Object.entries(nearby).map(item => {
                  const [key, val] = item;
                  return (
                    <Tab eventKey={key} title={key}>
                      {nearby[key].length ? (
                        splitByRow(nearby[key]).map(item => {
                          if (item.length == 2) {
                            const [item1, item2] = item;
                            return (
                              <div className={styles["nearby-row"]}>
                                <div className={styles["nearby-tab"]}>
                                  <div className={styles.top}>
                                    <span className={styles.left}>5</span>
                                    <span className={styles.right}>B+</span>
                                  </div>
                                  <span className={styles.bottom}>{item1}</span>
                                </div>
                                <div className={styles["nearby-tab"]}>
                                  <div className={styles.top}>
                                    <span className={styles.left}>5</span>
                                    <span className={styles.right}>B+</span>
                                  </div>
                                  <span className={styles.bottom}>{item2}</span>
                                </div>
                              </div>
                            );
                          } else {
                            return (
                              <div className={styles["nearby-row"]}>
                                <div className={styles["nearby-tab"]}>
                                  <div className={styles.top}>
                                    <span className={styles.left}>5</span>
                                    <span className={styles.right}>B+</span>
                                  </div>
                                  <span className={styles.bottom}>
                                    {item[0]}
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        })
                      ) : (
                        <p>Information not available.</p>
                      )}
                    </Tab>
                  );
                })}
              </Tabs>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default Feature;
