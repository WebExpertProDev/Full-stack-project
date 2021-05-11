/**
 *
 * Verification
 *
 */
import React, { useState, useContext } from "react";
import { Container } from "react-bootstrap";
import { useRouter } from "next/router";
import userContext from "../../../context/userContext";
// components
import Button from "../../../components/Button";
import Input from "../../../components/Input";

import { IVerification } from "./Verification";
// styles
import styles from "./styles/Verification.module.scss";

export const Verification: React.FunctionComponent<IVerification.IProps> = ({
  userPhone,
  userOTP,
  userName
}) => {
  console.log(userName);
  const router = useRouter();
  // const [phone, setPhone] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [resend, setResend] = useState<boolean>(false);
  const [errmsg, setErrMsg] = useState<string>("");
  const { user, setUser } = useContext(userContext);

  const ChangeInfo = () => {
    const request = new Request("http://localhost:5000/api/sendCode/getPhone", {
      method: "POST",
      body: JSON.stringify({ phone: userPhone }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });
    console.log(userPhone);
    fetch(request)
      .then(res => {
        console.log("sent to " + userPhone);
        console.log(res.status);
        if (res.status === 200) {
          return res.json();
        } else {
          return Promise.reject();
        }
      })
      .then(data => {
        console.log(data.code);
        localStorage.setItem("OTP", data.code);
        return;
      })
      .catch(err => console.log("error"));
  };

  const checkVerificationCode = () => {
    //console.log(localStorage.getItem('OTP'))
    // console.log(verificationCode)
    if (!resend) {
      localStorage.setItem("OTP", userOTP);
    }
    if (localStorage.getItem("OTP") != verificationCode) {
      setErrMsg("please try again");
      return;
    } else {
      localStorage.removeItem("OTP");
      setUser(userPhone);
      window.localStorage.setItem("phone", userPhone);
      window.localStorage.setItem("username", userName);
      console.log(user);
      router.reload();
    }
  };

  const resendCode = () => {
    setVerificationCode("");
    setResend(true);
    setErrMsg("");
    ChangeInfo();
  };

  return (
    <form className={styles.form}>
      <p className={styles.titlee}>{"Please enter your verification code"}</p>
      <span className={styles.desc}>
        {"Verification code has been sent to " + userPhone}
      </span>
      <div className="w-100 mt-5 mb-5">
        <Input
          change={setVerificationCode}
          value={verificationCode}
          theme="default"
          type="text"
          id="code"
          error={errmsg}
        />
      </div>
      <div className="mb-lg-4 mt-lg-4 mb-1 mt-5 h-50 d-flex align-items-end">
        <Button theme="primary" handleClick={checkVerificationCode}>
          Confirm
        </Button>
      </div>
      <div className="mb-lg-4 mt-lg-4 mb-1 mt-5 h-50 d-flex align-items-end">
        <Button theme="primary" handleClick={resendCode}>
          Resend Code
        </Button>
      </div>
    </form>
  );
};
export default Verification;
