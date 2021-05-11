import React, { useState, useContext } from "react";

import { Container } from "react-bootstrap";
import Button from "@Components/Button";
import Input from "@Components/Input";
import userContext from "../../../../../context/userContext";
// import Notification from '@Components/Notification';
import { IVerification } from "./Verification";

// styles
import styles from "./styles/verification.module.scss";

// assets
import Path from "./svg/path.svg";

export function stoeotp() {}

export const index: React.FunctionComponent<IVerification.IProps> = ({
  changePageHandler
}) => {
  const [verificationCode, setverificationCode] = useState<string>("");
  const [phone, setphone] = useState<string>("");
  const { user, setUser } = useContext(userContext);
  const [info, setInfo] = useState<IVerification.IState>({
    login: false,
    title: "Please enter personal information",
    msg: "Please enter a mobile number",
    error: ""
  });
  const ChangeInfo = () => {
    setInfo({
      login: true,
      title: "Please enter your verification code",
      msg: "Verification code has been sent to " + phone,
      error: ""
    });
    const request = new Request("http://localhost:5000/api/sendCode/getPhone", {
      method: "POST",
      body: JSON.stringify({ phone: phone }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });
    fetch(request)
      .then(res => {
        console.log("sent to " + phone);
        console.log(res.status);
        if (res.status === 200) {
          return res.json();
        } else {
          console.log("errno");
          return;
        }
      })
      .then(data => {
        console.log(data.code);
        window.localStorage.setItem("userid", data.userid);
        window.localStorage.setItem("username", data.username);
        localStorage.setItem("OTP", data.code);
      });
  };

  const checkVerificationCode = () => {
    //console.log(localStorage.getItem('OTP'))
    // console.log(verificationCode)
    if (localStorage.getItem("OTP") != verificationCode) {
      setInfo({
        login: true,
        title: "Please enter your verification code",
        msg: "Verification code has been sent to " + phone,
        error: "Please try again"
      });
      return;
    } else {
      localStorage.removeItem("OTP");
      setUser(phone);
      window.localStorage.setItem("phone", phone);
      changePageHandler(4);
    }
  };

  const differentNumber = () => {
    setInfo({
      login: false,
      title: "Please enter personal information",
      msg: "Please enter a mobile number",
      error: ""
    });
    setphone("");
  };

  const resendCode = () => {
    setverificationCode("");
    ChangeInfo();
  };

  return (
    <section className={`${styles.verification} wow fadeInUp`}>
      {/* <Notification status="success">Enter correct code</Notification> */}
      <Container>
        <div className={`d-flex align-items-center ${styles.hero}`}>
          <Path />
          <h1 className={styles.title}>Request a Tour</h1>
        </div>
        <div
          className={`d-flex flex-column justif-content-center mt-5 ${styles.wrapper}`}
        >
          <p className={styles.titlee}>{info.title}</p>
          <span className={styles.desc}>{info.msg}</span>
          <div className="w-100 mt-5 mb-5">
            {/* <span>Please try again</span> */}
            {info.login ? (
              <Input
                value={verificationCode}
                change={setverificationCode}
                theme="default"
                type="text"
                error={info.error}
              />
            ) : (
              <Input
                value={phone}
                change={setphone}
                theme="default"
                type="text"
              />
            )}
          </div>
          {info.login ? (
            <div className={styles.paragraph}>
              <p onClick={differentNumber}>Send to a different number</p>
              <p onClick={resendCode}>Resend code</p>
            </div>
          ) : null}

          <div className="w-100 ">
            {!info.login ? (
              <Button font="17px" handleClick={ChangeInfo}>
                Next
              </Button>
            ) : (
              <Button font="17px" handleClick={checkVerificationCode}>
                Book tour
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default index;
