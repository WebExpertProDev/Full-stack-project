/**
 *
 * SignIn
 *
 */
import React, { useState } from "react";

// components
import Button from "../../../components/Button";
import Input from "../../../components/Input";

// svg
import Facebook from "../svg/facebook.svg";
import Google from "../svg/google.svg";
import HiddenPass from "../svg/eye-slash-solid.svg";
import Verification from "../Verification";
// styles
import Styles from "./styles/SignIn.module.scss";

export const SignIn: React.FunctionComponent = () => {
  const [phone, setPhone] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  const [showVerification, setShowVerification] = useState<Boolean>(false);
  const [username, setName] = useState<string>("");
  const handleClick = () => {
    console.log(phone);
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
        console.log("feed back from signin:" + data.code);
        localStorage.setItem("OTP", data.code);
        setName(data.username);
        setShowVerification(true);
        return;
      })
      .catch(err => console.log("error"));
  };

  return (
    <>
      {showVerification ? (
        <Verification
          userOTP={localStorage.getItem("OTP")}
          userPhone={phone}
          userName={username}
        />
      ) : (
        <form className={Styles.form}>
          <p className={Styles.title}>Sign In</p>
          <div className="mb-lg-3 mb-2">
            <Button hasIcon={<Facebook />} theme="default">
              Sign in with Facebook
            </Button>
          </div>
          <div className="mb-lg-3 mb-2">
            <Button hasIcon={<Google />} theme="default">
              Sign in with Google
            </Button>
          </div>

          <div className={Styles.divider}>or</div>
          <div className="mb-5 mt-5 ">
            <Input
              change={setPhone}
              value={phone}
              label="Phone Number"
              type="text"
              id="phone"
            />
          </div>
          {/* <div>
            <Input
              change={setPassword}
              value={password}
              label="Password"
              type="Password"
              hasIcon={<HiddenPass />}
              id="password"
            />
          </div> */}
          <div className="mb-lg-4 mt-lg-4 mb-1 mt-5 h-50 d-flex align-items-end">
            <Button theme="primary" handleClick={handleClick}>
              Sign in
            </Button>
          </div>

          {/* <a href="/forgotPassword" className={Styles.forgotPass}>
            Forgot Password?
          </a> */}
        </form>
      )}
    </>
  );
};
export default SignIn;
