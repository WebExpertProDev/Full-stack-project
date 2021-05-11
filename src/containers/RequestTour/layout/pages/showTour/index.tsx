import React from "react";

import { Container } from "react-bootstrap";
import Button from "@Components/Button";
import { useRouter } from "next/router";
import { IShowTour } from "./showTour";

// assets
import Location from "./svg/location.svg";
import Datee from "./svg/date.svg";
import End from "./svg/end.svg";
import Start from "./svg/start.svg";
import Home from "./svg/home.svg";
import avatar from "./svg/avatar.png";
import Path from "./svg/path.svg";
import ShowTour from "./svg/showtour.svg";

// styles
import styles from "./styles/Showtour.module.scss";

export const index: React.FunctionComponent<IShowTour.IProps> = ({
  currentDate,
  appType,
  agentInfo
}) => {
  const router = useRouter();
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const address =
    typeof window !== "undefined" ? localStorage.getItem("HomeAddress") : null;
  const bookTour = () => {
    let PostalCode, Province, City;
    if (typeof window !== "undefined") {
      PostalCode = window.localStorage.getItem("PostalCode");
      Province = window.localStorage.getItem("Provience");
      City = window.localStorage.getItem("City");
    }
    let endDate = new Date();
    endDate.setMinutes(currentDate.getMinutes() + 30);
    const request = new Request("http://localhost:5000/api/addTour", {
      method: "POST",
      body: JSON.stringify({
        streetAddress: address,
        city: City,
        province: Province,
        postalCode: PostalCode,
        homeCount: "1",
        date: { start: currentDate.toString(), end: endDate.toString() },
        hasAgent: agentInfo
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });
    fetch(request)
      .then(res => {
        if (res.status === 200) {
          return;
        } else {
          console.log("errno");
          return;
        }
      })
      .catch(err => console.log("error"));

    //send tour info to backend
    router.push("/"); //back to dashboard
  };
  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  function Half(i) {
    if (i > 12) {
      return i - 12;
    }
    return i;
  }

  return (
    <>
      <section className={`${styles.showtour} wow fadeInUp`}>
        {!agentInfo ? (
          <div className="d-flex flex-column justify-content-center align-items-center w-100">
            <div className={styles.herosvg}>
              <Path className={styles.path} />
              <ShowTour />
            </div>
            <p className={`mt-4 mb-4 ${styles.inPersonTour}`}>our in person</p>
          </div>
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center w-100">
            <div className={styles.herosvg}>
              <Path className={styles.path} />
              <ShowTour />
            </div>
            <p className={`mt-4 mb-4 ${styles.videoTour}`}>
              ideo tour via {appType}
            </p>
            <div
              className={`d-flex align-items-center justify-content-center ${styles.avatar}`}
            >
              <img src={avatar} alt="" />
              <div>
                <p>Grace Thornton</p>
                <p>Latest tenant</p>
              </div>
            </div>
            <span className={styles.job}>Professional Real Estate Agent</span>
          </div>
        )}
        <Container fluid="xl" className="px-lg-0">
          <div
            className={`d-flex  justify-content-between ${styles.datesection}`}
          >
            <span
              className="d-flex align-items-center wow fadeInUp"
              data-wow-delay="0.9s"
            >
              <Location />
              <p>Location: {address}</p>
            </span>
            <span
              className="d-flex align-items-center wow fadeInUp"
              data-wow-delay="1.1s"
            >
              <Home />
              <p> Homes: 1</p>
            </span>
            <span
              className="d-flex align-items-center wow fadeInUp"
              data-wow-delay="1.3s"
            >
              <Datee />
              <p>
                {" "}
                Date: {weekday[currentDate.getDay()]},{" "}
                {month[currentDate.getMonth()]} {currentDate.getDate()}
              </p>
            </span>
            <span
              className="d-flex align-items-center wow fadeInUp"
              data-wow-delay="1.5s"
            >
              <Start />
              <p>
                Start: {addZero(Half(currentDate.getHours()))}:
                {addZero(currentDate.getMinutes())}{" "}
                {currentDate.getHours() >= 12 ? "pm" : "am"}
              </p>
            </span>
            <span
              className="d-flex align-items-center wow fadeInUp"
              data-wow-delay="1.7s"
            >
              <End />
              <p>
                {" "}
                End:
                {addZero(
                  Half(
                    currentDate.getMinutes() >= 30
                      ? currentDate.getHours() + 1
                      : currentDate.getHours()
                  )
                )}
                :
                {addZero(
                  currentDate.getMinutes() >= 30
                    ? currentDate.getMinutes() - 30
                    : currentDate.getMinutes() + 30
                )}{" "}
                {currentDate.getHours() >= 12 ? "pm" : "am"}
              </p>
            </span>
          </div>
        </Container>
        <Container fluid="lg" className="px-lg-0 mt-5 mb-5">
          <div
            className={`d-flex justify-content-center align-items-center ${styles.btngruop}`}
          >
            <div
              className={`d-flex flex-column align-items-center  ${styles.btndash}`}
            >
              <Button handleClick={bookTour} theme="outline" font="17px">
                Dashboard
              </Button>
              <div className="d-flex flex-column align-items-center w-100  mt-3">
                <Button
                  theme="outline"
                  font="17px"
                  handleClick={() => router.push("/listing")}
                >
                  Back to Listing Page
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
export default index;
