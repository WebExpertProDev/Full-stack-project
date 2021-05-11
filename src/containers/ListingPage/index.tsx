/**
 *
 * ListingPage
 *
 */
import React, { memo, useState, useEffect, useContext } from "react";
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
import { getSellListing, getRentimage, getRentListing } from "./action";

const mapMarkers = [
  {
    address: "Marker1",
    latlng: {
      lat: 59.95,
      lng: 30.33
    },
    description: ""
  },
  {
    address: "Marker2",
    latlng: {
      lat: 59.962,
      lng: 30.332
    },
    description: ""
  },
  {
    address: "Marker3",
    latlng: {
      lat: 59.9506,
      lng: 30.325
    },
    description: ""
  }
];

const ListingPage: React.FunctionComponent<IListingPage.IProps> = () => {
  const { user, setUser } = useContext(userContext);
  const [showMap, setShowMap] = useState<boolean>(true);

  const [data, setdata] = useState([]);
  const [currentdata, setcurrentdata] = useState([]);
  const [rentsell, setrentsell] = useState("rent");
  const size = useWindowSize();
  const [markers, setMarkers] = useState(mapMarkers);
  const setFilterOnData = ({ filterOptions, formFields }) => {
    if (rentsell == "rent") {
      getRentListing(setdata, setpagesCount, setcurrentdata, currentPage);
    } else {
      getSellListing(setdata, setpagesCount, setcurrentdata, currentPage);
    }
    let filterdData = data;
    console.log(formFields);
    const searchString = formFields.search ? formFields.search.toString() : "";

    // Filter By  search
    if (searchString !== "") {
      filterdData = filterdData.filter(option => {
        const searchByAddress =
          option.streetAddress
            .toLowerCase()
            .indexOf(searchString.toLowerCase()) > -1;
        const searchByCity =
          option.city.toLowerCase().indexOf(searchString.toLowerCase()) > -1;
        const searchByProvince =
          option.province.toLowerCase().indexOf(searchString.toLowerCase()) >
          -1;
        const searchByUnit =
          option.unitNumber.toLowerCase().indexOf(searchString.toLowerCase()) >
          -1;
        const searchByPostalCode =
          option.postalCode.toLowerCase().indexOf(searchString.toLowerCase()) >
          -1;

        return (
          searchByCity ||
          searchByAddress ||
          searchByProvince ||
          searchByUnit ||
          searchByPostalCode
        );
      });
    }
    // Filter By Type (Rent/Buy)
    setrentsell(formFields.type.title.toLowerCase());
    console.log(rentsell);
    filterdData = filterdData.filter(option => {
      const bedsOption =
        option.bedRoomCount === String(formFields.roomCount.title);
      const bathOption =
        option.bathRoomCount === String(formFields.bathRoomCount);
      // const filterByMinPrice =
      //   formFields.minPrice !== 0
      //     ? option.price > Number(formFields.minPrice)
      //     : true;
      // const filterByMaxPrice =
      //   formFields.maxPrice !== 0
      //     ? option.price < Number(formFields.maxPrice)
      //     : true;
      // console.log(bedsOption);
      return bedsOption && bathOption;
      // return typeOption && bedsOption && filterByMinPrice && filterByMaxPrice;
    });

    // console.log('filter data');
    // console.log(filterdData);
    // console.log(filterdData.length);
    setdata(filterdData);
  };

  // Pagination

  const [currentPage, setcurrentPage] = useState<number>(1);
  const [pagesCount, setpagesCount] = useState<number>(0);
  const [position, setposition] = useState([50, 50]);
  const pincheck = (lat, lng) => {
    setposition([lat, lng]);
  };
  useEffect(() => {
    if (rentsell == "rent") {
      getRentListing(setdata, setpagesCount, setcurrentdata, currentPage);
    } else {
      getSellListing(setdata, setpagesCount, setcurrentdata, currentPage);
    }

    if ("geolocation" in navigator) {
      // GeolocationPosition.coords;
      navigator.geolocation.getCurrentPosition(function(pos) {
        setposition([pos.coords.latitude, pos.coords.longitude]);
        console.log(position);
      });
      console.log("available");
    } else {
      console.log("Not available");
    }
    // const maxpage = 10;
    // const count = data.length / 10;
    // setpagesCount(Math.round(count));
    // setcurrentdata(data.slice(currentPage, currentPage + 10));
  }, []);

  useEffect(() => {
    const maxpage = 10;
    const count = data.length / 10;
    setpagesCount(Math.round(count));
    setcurrentdata(data.slice((currentPage - 1) * 10, currentPage * 10));
  }, [currentPage]);

  useEffect(() => {
    const maxpage = 10;
    const count = data.length / 10;
    setpagesCount(Math.round(count));
    setcurrentdata(data.slice((currentPage - 1) * 10, currentPage * 10));
  }, [data]);

  useEffect(() => {
    if (rentsell == "rent") {
      getRentListing(setdata, setpagesCount, setcurrentdata, currentPage);
    } else {
      getSellListing(setdata, setpagesCount, setcurrentdata, currentPage);
    }
  }, [rentsell]);
  // useEffect(() => {
  //    const maxpage = 10;
  //   const count = data.length / 10;
  //   console.log(count);
  //   setpagesCount(Math.round(count));
  //   setcurrentdata(data.slice(currentPage, currentPage + 10));

  // }, []);

  const backPage = () => {
    setcurrentPage(prev => (prev > 0 ? prev - 1 : 0));
  };

  const nextPage = () => {
    setcurrentPage(prev => prev + 1);
  };

  const gotoPage = page => {
    setcurrentPage(page);
  };

  return (
    <>
      <MainHeader openAuthModel={() => {}} Theme="light" />
      <Filters filterHandler={setFilterOnData} />
      <section>
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
              <div className={styles.hidebtn}>
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
              </div>
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
                    />
                  </div>
                </div>
              )}
            </Flipped>

            <Flipped flipId="square">
              <div
                className={!showMap ? styles.housecardmap : styles.housecard}
              >
                {size > 714 ? (
                  <HouseList cardItems={currentdata} cartLayout={showMap} />
                ) : (
                  <MobileSlider cardItems={currentdata} />
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
