/**
 *
 * SignIn
 *
 */
import React, { useState, useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { useRouter } from "next/router";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import userContext from "../../../context/userContext";
// components
import Button from "../../../components/Button";
import Input from "../../../components/Input";
// svg
import Facebook from "../svg/facebook.svg";
import Google from "../svg/google.svg";
import Verification from "../Verification";
// styles
import Styles from "./styles/SignIn.module.scss";

export const SignIn: React.FunctionComponent = () => {
  const [phone, setPhone] = useState<string>("");
  const router = useRouter();
  const [showVerification, setShowVerification] = useState<Boolean>(false);
  const [username, setName] = useState<string>("");
  const clientId = ""; //client id for google project
  const appid = ""; //appid for facebook project
  const { user, setUser } = useContext(userContext);
  const responseGoogle = response => {
    console.log("Google Login Success");
    //connect with backend login api
    const signInrequest = new Request(
      "http://localhost:5000/api/externaluser/signin",
      {
        method: "POST",
        body: JSON.stringify({
          email: response.profileObj.email,
          username: response.profileObj.name
        }),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      }
    );
    fetch(signInrequest)
      .then(res => {
        console.log(res.status);
        if (res.status === 200) {
          return res.json();
        } else {
          console.log("errno" + res.status);
          return;
        }
      })
      .then(data => {
        console.log("feed back from signin:" + data);
        window.localStorage.setItem("userid", data.userid);
        // setShowPrivacy(true);
        return;
      })
      .catch(err => console.log("error"));
    setUser(response.profileObj.email);
    window.localStorage.setItem("email", response.profileObj.email);
    window.localStorage.setItem("username", response.profileObj.name);
    console.log(user);
    router.reload();
  };

  const handleLoginFailure = error => {
    console.log("Google Login Failure ", error);
  };
  const responseFacebook = response => {
    console.log("Facebook Login Success");
    //connect with backend login api
    const signInrequest = new Request(
      "http://localhost:5000/api/externaluser/signin",
      {
        method: "POST",
        body: JSON.stringify({
          email: response.email,
          username: response.name
        }),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      }
    );
    fetch(signInrequest)
      .then(res => {
        console.log(res.status);
        if (res.status === 200) {
          return res.json();
        } else {
          console.log("errno" + res.status);
          return;
        }
      })
      .then(data => {
        console.log("feed back from signin:" + data);
        window.localStorage.setItem("userid", data.userid);
        // setShowPrivacy(true);
        return;
      })
      .catch(err => console.log("error"));
    setUser(response.email);
    window.localStorage.setItem("email", response.email);
    window.localStorage.setItem("username", response.name);
    console.log(user);
    router.reload();
  };

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
        localStorage.setItem("userid", data.userid);
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
            <FacebookLogin
              appId={appid}
              render={renderProps => (
                <Button
                  theme="default"
                  hasIcon={<Facebook />}
                  handleClick={renderProps.onClick}
                >
                  Sign in with Facebook
                </Button>
              )}
              autoLoad
              fields="name,email,picture"
              callback={responseFacebook}
              icon={<Facebook />}
            />
          </div>
          <div className="mb-lg-3 mb-2">
            <GoogleLogin
              clientId={clientId}
              render={renderProps => (
                <Button
                  theme="default"
                  hasIcon={<Google />}
                  handleClick={renderProps.onClick}
                >
                  Sign in with Google
                </Button>
              )}
              onSuccess={responseGoogle}
              onFailure={handleLoginFailure}
            />
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
