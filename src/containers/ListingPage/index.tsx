/**
 *
 * ListingPage
 *
 */
import React, { memo, useState, useEffect, useContext, useRef } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";
import { useRouter } from "next/router";
import userContext from "../../context/userContext";

// Hooks
import useWindowSize from "@Services/hooks/useWindowSize";

// Statid Data
import { filtersortBy } from "../../staticData/Listing/data";

// layouts
import { Container } from "react-bootstrap";
import { IListingPage } from "@Interfaces/index";
import Map from "@Components/Map";
import MainHeader from "../../layouts/MainHeader";
import HouseList from "./layouts/HouseCardList";
import Filters from "./layouts/Filters";
import Pagination from "../../components/Paginator";
import MainFooter from "../../layouts/MainFooter";
import Button from "../../components/Button";
import Select from "../../components/Select";
import MobileSlider from "./layouts/MobileSlideCart";
// Styles
import styles from "./styles/ListingPage.module.scss";
import allmyhomies from "../../../../DEV_BACKEND/public/rentImages/allmyhomies";
import cartImage from "../../../public/static/images/building.png";
//API call
import {
  getSellListing,
  getRentimage,
  getHomeFilter,
  getHomeListing,
  getRentListing
} from "./action";

const ListingPage: React.FunctionComponent<IListingPage.IProps> = () => {
  const { user, setUser } = useContext(userContext);
  const [showMap, setShowMap] = useState<boolean>(true);
  const isMount = useRef(false);
  const [data, setdata] = useState([]);
  const [currentdata, setcurrentdata] = useState([]);
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [pagesCount, setpagesCount] = useState<number>(0);
  const [position, setposition] = useState([0, 0]);
  const [currentlocation, changelocation] = useState(null);
  const [activefilter, setactivefilter] = useState([]);
  const size = useWindowSize();
  const setFilterOnData = ({ filterOptions, formFields }) => {
    const {
      roomCount,
      bathroomCount,
      parkingCount,
      minPrice,
      maxPrice,
      utilities
    } = formFields;

    console.log("FIlter");
    setactivefilter(utilities.filter(element => element.status == true));
    const filterSubmission = {
      forRent: formFields.type.title.toLowerCase() == "rent",
      bedRoomCount: roomCount.title,
      bathRoomCount: bathroomCount.title,
      parkingCount: parkingCount.title,
      minprice: minPrice,
      maxprice: maxPrice,
      propertyFeatures: activefilter,
      position
    };

    const { search } = formFields;

    // });
    console.log(formFields);
    console.log(filterSubmission);
    getHomeFilter(
      filterSubmission,
      search,
      setdata,
      setpagesCount,
      setcurrentdata,
      setcurrentPage
    );
  };

  // Pagination

  const pincheck = (lat, lng) => {
    setposition([lat, lng]);
  };
  useEffect(() => {
    if ("geolocation" in navigator) {
      // GeolocationPosition.coords;
      navigator.geolocation.getCurrentPosition(function(pos) {
        setposition([pos.coords.latitude, pos.coords.longitude]);
      });

      console.log("available");
    } else {
      console.log("Not available");
    }
  }, []);

  useEffect(() => {
    if (isMount.current) {
      getHomeListing(
        { forRent: false, position },
        setdata,
        setpagesCount,
        setcurrentdata,
        setcurrentPage
      );
    } else {
      isMount.current = true;
    }
  }, [position]);

  useEffect(() => {
    let count = data.length / 10;
    if (data.length % 10 > 0) {
      count += 1;
    }
    setpagesCount(Math.floor(count));
    console.log(currentdata);
    setcurrentdata(data.slice((currentPage - 1) * 10, currentPage * 10));
    console.log(currentdata);
  }, [currentPage]);

  const backPage = () => {
    setcurrentPage(prev => (prev > 1 ? prev - 1 : 1));
  };

  const nextPage = () => {
    setcurrentPage(prev => (prev < pagesCount ? prev + 1 : pagesCount));
  };

  const gotoPage = page => {
    setcurrentPage(page);
  };

  return (
    <>
      <MainHeader openAuthModel={() => {}} Theme="light" />
      <Filters
        filterHandler={setFilterOnData}
        setShowMap={() => setShowMap(!showMap)}
      />

      <section>
        <Container className="p-lg-0" fluid="xl">
          <div className={styles.activeFilter}>
            <div className={styles["btn-groups"]}>
              {activefilter.map(item => {
                return (
                  <div className={styles.hidebtn}>
                    <Button theme="outline" size="md" font="15px">
                      {item.schematitle}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>

        <Container className="p-lg-0" fluid="xl">
          <div className={styles.listHeader}>
            <div className={styles["btn-groups"]}>
              <div className={styles.hidebtn}>
                <Button
                  theme="outline"
                  size="md"
                  font="15px"
                  handleClick={() => setShowMap(!showMap)}
                >
                  {showMap ? "hide map " : "show map"}
                </Button>
              </div>
              <div className={styles.selectbtn}>
                <Select
                  defaultSelected="Sort by"
                  options={filtersortBy}
                  label="Sort by"
                  theme="dd-wrapper-secondary"
                />
              </div>
              {/* <div className={styles.hidebtn}>
                <Button
                  theme="outline"
                  size="md"
                  font="15px"
                  handleClick={() => pincheck(30, 30)}
                >
                  agent location
                </Button>
              </div>
              <div className={styles.hidebtn}>
                <Button
                  theme="outline"
                  size="md"
                  font="15px"
                  handleClick={() => pincheck(50, 50)}
                >
                  A House
                </Button>
              </div>
              <div>
                Those 2 buttons will be removed it is for protype purposes
              </div> */}
            </div>

            <span className={styles.results}>{`${
              data ? data.length : 0
            } Results`}</span>
          </div>
        </Container>
      </section>
      <section className={styles.mapwrapper}>
        <Container fluid className="p-0">
          <Flipper
            translate
            flipKey={showMap}
            className={`d-flex flex-wrap ${
              !showMap ? "justify-content-between" : ""
            } `}
          >
            <Flipped flipId="square">
              {showMap && (
                <div className={styles.map}>
                  <div className={styles.mapContainer}>
                    <Map
                      latitude={position[0]}
                      longitude={position[1]}
                      json={currentdata}
                      locationchange={changelocation}
                      locationcurrent={currentlocation}
                    />
                  </div>
                </div>
              )}
            </Flipped>

            <Flipped flipId="square">
              <div
                className={!showMap ? styles.housecardmap : styles.housecard}
              >
                {size > 714 || !showMap ? (
                  <HouseList
                    cardItems={currentdata}
                    cartLayout={showMap}
                    currentItem={currentlocation}
                  />
                ) : (
                  <MobileSlider
                    cardItems={currentdata}
                    currentItem={currentlocation}
                  />
                )}
              </div>
            </Flipped>
          </Flipper>
        </Container>
      </section>
      {/* pagintaion */}

      {size > 714 && (
        <div className="d-flex flex-column align-items-center justify-content-center mt-5 mb-5 wow fadeInUp">
          <Pagination
            handler={gotoPage}
            count={pagesCount}
            backHandler={backPage}
            nextHandler={nextPage}
            current={currentPage}
          />
        </div>
      )}

      {/* footer */}
      {/* <button onClick= {pincheck}>TEST</button> */}
      <MainFooter />
    </>
  );
};

export default memo(ListingPage);
