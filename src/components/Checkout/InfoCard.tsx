import React from "react";
import { Container } from "react-bootstrap";
import Button from "@Components/Button";
import { useRouter } from "next/router";
import styles from "./styles/InfoCard.module.scss";
const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

const InfoCard = session_id => {
  const [customer, setCustomer] = React.useState({
    customer_details: { email: "" }
  });
  const id = session_id.session_id;
  const fetchUserEmail = async () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer sk_test_51IG6MSLvlbaFqlOjvNhF8bTufjBAMD2o5YCHa6cSyXpCl7VroURpvWi59cCiqrUkIG0LB5PxzsvpU0VP1ZN4Xw12004vNsXPHi"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };
    if (id) {
      const url = "https://api.stripe.com/v1/checkout/sessions/" + id;
      console.log(url);
      // fetch("https://api.stripe.com/v1/checkout/sessions/cs_test_a1LMTUJ6aP0ap3SBQfuleaM1IdfhRuIA2I5SeUBkOn1UBuu4xPVOqCJT6u",
      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => setCustomer(JSON.parse(result)))
        .catch(error => console.log("error", error));
    }
  };
  fetchUserEmail();
  console.log(customer);
  const router = useRouter();
  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100">
      <p className={`mt-4 mb-4 ${styles.successPayment}`}>ayment Success!</p>
      <div
        className={`d-flex align-items-center justify-content-center ${styles.info}`}
      >
        <div>
          <p>Your payment has been processed successfully!</p>
          <p>Email: {customer.customer_details.email}</p>
          <p>Amount: ${customer.amount_total}</p>
        </div>
      </div>
      <Container fluid="lg" className="px-lg-0 mt-5 mb-5">
        <div
          className={`d-flex justify-content-center align-items-center ${styles.btngruop}`}
        >
          <div
            className={`d-flex flex-column align-items-center  ${styles.btndash}`}
          >
            <Button
              theme="outline"
              font="17px"
              handleClick={() => router.push("/")}
            >
              Dashboard
            </Button>
            <div className="d-flex flex-column align-items-center w-100  mt-3">
              <Button
                theme="outline"
                font="17px"
                handleClick={() => router.push("/detail/1")}
              >
                Back to Listing Page
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default InfoCard;
