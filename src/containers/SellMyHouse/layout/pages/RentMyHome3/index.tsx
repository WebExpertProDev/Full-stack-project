/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import Geocode from "react-geocode";
import { useRouter } from "next/router";
import { Container, Row, Col } from "react-bootstrap";
import Input from "@Components/Input";
import Select from "@Components/Select";
import Map from "@Components/Map";
import Button from "@Components/Button";
import Link from "@Components/Link";
import { IRentMyHome3 } from "./RentMyHome3";
// styles
import styles from "./styles/RentMyHome3.module.scss";

// assets
import Pin from "./svg/pin.svg";
import Cancel from "./svg/cancel.svg";

export const index: React.FunctionComponent<IRentMyHome3.IProps> = ({
  changePageHandler,
  homeInfo,
  setHomeInfo
}) => {
  console.log(homeInfo);
  const [currentlocation, changelocation] = useState(null);
  const [city, setCity] = useState<string>("");
  const [latitude, setLat] = useState<number>(0);
  const [longitude, setLong] = useState<number>(0);
  const [streetAddress, setstreetAddress] = useState<string>("");
  const [province, setprovince] = useState<string>("");
  const [postalCode, setpostalCode] = useState<string>("");
  const [currentdata, setcurrentdata] = useState([]);
  // const [position, setposition] = useState([0, 0]);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  let userid;
  if (typeof window !== "undefined") {
    userid = window.localStorage.getItem("userid");
  }
  const updateLocation = () => {
    //var position = v
    //  setstreetAddress(v)
    Geocode.setApiKey("AIzaSyCoqgrOVdCrEJtcZTYFXPAMMW9UBNUltaU");

    // set response language. Defaults to english.
    Geocode.setLanguage("en");
    // Get latitude & longitude from address.
    Geocode.fromAddress(streetAddress + "," + city + "," + province).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        setLat(lat);
        setLong(lng);
        setConfirmed(true);
      },
      error => {
        console.error(error);
      }
    );
  };
  const router = useRouter();
  const cancel = () => {
    router.push("/");
  };
  const update = () => {
    var agentID = [];
    // if (homeInfo.hasAIAndAgent == true) {
    //   const request = new Request(
    //     "http://localhost:5000/api/user/assignAgent",
    //     {
    //       method: "POST",
    //       //  body: JSON.stringify(homeInfo),
    //       body: JSON.stringify({ userid: userid, city: homeInfo.city }),
    //       headers: {
    //         Accept: "application/json, text/plain, */*",
    //         "Content-Type": "application/json"
    //       }
    //     }
    //   );
    //   fetch(request)
    //     .then(res => {
    //       console.log(res.status);
    //       if (res.status === 200) {
    //         return res.json();
    //       } else {
    //         console.log("errno");
    //         return;
    //       }
    //     })
    //     .then(data => {
    //       console.log(data.assignedAgentId);
    //       agentID = [data.assignedAgentId];
    //     })
    //     .catch(err => console.log("error"));
    // } //automatically get an agent for user who requires
    setHomeInfo({
      ...homeInfo,
      city: city,
      province: province,
      streetAddress: streetAddress,
      postalCode: postalCode,
      agentID: agentID,
      latAndLong: { lat: String(latitude), Long: String(longitude) }
    });
    changePageHandler(3);
  };

  const options = [
    {
      id: 0,
      title: "House",
      selected: false,
      key: "provience"
    },
    {
      id: 1,
      title: "Vacant Land",
      selected: false,
      key: "provience"
    },
    {
      id: 2,
      title: "Apartment",
      selected: false,
      key: "provience"
    },
    {
      id: 3,
      title: "Agriculture",
      selected: false,
      key: "provience"
    },
    {
      id: 4,
      title: "Row/Townhouse",
      selected: false,
      key: "provience"
    },
    {
      id: 5,
      title: "Business",
      selected: false,
      key: "provience"
    },
    {
      id: 6,
      title: "Retail",
      selected: false,
      key: "provience"
    },
    {
      id: 7,
      title: "Offices",
      selected: false,
      key: "provience"
    },
    {
      id: 8,
      title: "Other",
      selected: false,
      key: "provience"
    }
  ];
  console.log(homeInfo);
  return (
    <section className="wow fadeInUp">
      <Container fluid="lg" className="px-lg-0">
        <Row>
          <Col lg="6" md="6" sm="6" xs="10" className="mx-auto">
            <form className="d-flex flex-column mt-5">
              <div className={styles["input-form"]}>
                <label htmlFor="Street Address">Street Address</label>
                <Input
                  change={v => setstreetAddress(v)}
                  value={streetAddress}
                  theme="default"
                  type="text"
                  id="Street Address"
                />
              </div>
              <div className={styles["input-form"]}>
                <label htmlFor="City">City</label>
                <Input
                  change={v => setCity(v)}
                  value={city}
                  theme="default"
                  type="text"
                  id="City"
                />
              </div>
              <div className={styles["input-form"]}>
                <label htmlFor="Province">Province</label>
                <Input
                  change={v => setprovince(v)}
                  value={province}
                  theme="default"
                  type="text"
                  id="Province"
                />
              </div>
              <div className={styles["input-form"]}>
                <label htmlFor="postal code">Postal Pode</label>
                <Input
                  value={postalCode}
                  change={v => setpostalCode(v)}
                  theme="default"
                  type="text"
                  id="postal code"
                />
              </div>
              <div className={styles["input-form"]}>
                <Button
                  handleClick={updateLocation}
                  disabled={
                    city == "" ||
                    province == "" ||
                    postalCode == "" ||
                    streetAddress == ""
                  }
                >
                  Confirm
                </Button>
              </div>
            </form>
          </Col>

          <Col lg="6" md="6" sm="6" xs="10" className="mx-auto">
            {/* <div className={`${styles.select} mt-5`}>
              <label htmlFor="">Property Type</label>
              <Select theme="dd-wrapper-secondary" options={options} selectOnChange={v=> setHome({...home, propertyType: v.title})}/>
            </div> */}
            <div className="mt-5">
              <div className={styles["input-form"]}>
                <label htmlFor="">Property Type</label>
                <Select
                  defaultSelected="House"
                  theme="dd-wrapper-secondary"
                  options={options}
                  selectOnChange={v =>
                    setHomeInfo({
                      ...homeInfo,
                      overview: {
                        ...homeInfo.overview,
                        propertyType: v.title,
                        yearBuilt: "unknown"
                      }
                    })
                  }
                />
              </div>
              <div
                className={`d-flex align-items-center  mb-1 ${styles.maptitle}`}
              >
                <div className={styles.pin}>
                  <Pin />
                </div>

                <span>Add in google maps</span>
              </div>
              <div style={{ height: "250px", width: "100%" }}>
                <Map
                  latitude={latitude}
                  longitude={longitude}
                  json={currentdata}
                  locationchange={changelocation}
                  locationcurrent={currentlocation}
                />
              </div>
            </div>

            <div className={styles.nextbtn}>
              <Button handleClick={update} disabled={!confirmed}>
                Next
              </Button>
              <Link href="/">
                <div
                  className={`${styles.cancel} d-flex align-items-center mt-2`}
                >
                  <Cancel onClick={cancel} />
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
