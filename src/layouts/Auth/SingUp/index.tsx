/**
 *
 * SignUp
 *
 */
import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
// components
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Privacy from "../Privacy";

// svg
import Facebook from "../svg/facebook.svg";
import Google from "../svg/google.svg";

// styles
import Styles from "./styles/SignUp.module.scss";

export const SignUp: React.FunctionComponent = () => {
  const [showPrivacy, setShowPrivacy] = useState<Boolean>(false);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [useEmail, setUseEmail] = useState<boolean>(false);
  const [externalType, setExternalType] = useState<string>("");
  const clientId =
    "480480617938-hah668dngr5tfrjrkeun7omkru4fsf0i.apps.googleusercontent.com";
  //"564787136738-go02kpuhqsnd6q12o3armikn2b3ob5rb.apps.googleusercontent.com"; //put clientId for google projects here
  const appid = ""; //appid for facebook projects
  const responseGoogle = response => {
    console.log("Google Login Success");
    setPhone(response.profileObj.email);
    setName(response.profileObj.name);
    setUseEmail(true);
    setShowPrivacy(true);
    setExternalType("Google");
  };

  const handleLoginFailure = error => {
    console.log("Google Login Failure ", error);
  };
  const responseFacebook = response => {
    console.log("Facebook Login Success");
    setName(response.name);
    setPhone(response.email);
    setUseEmail(true);
    setShowPrivacy(true);
    setExternalType("Facebook");
  };
  const handleClick = () => {
    setShowPrivacy(true);
    return;
  };

  return (
    <>
      {showPrivacy ? (
        <Privacy
          phoneNum={phone}
          name={name}
          DeclinePrivacy={setShowPrivacy}
          useEmail={useEmail}
          cleanPhone={setPhone}
          cleanName={setName}
          type={externalType}
        />
      ) : (
        <form>
          <p className={Styles.title}>Sign Up</p>
          <div className="mb-3">
            <FacebookLogin
              appId={appid}
              render={renderProps => (
                <Button
                  theme="default"
                  hasIcon={<Facebook />}
                  handleClick={renderProps.onClick}
                >
                  Sign up with Facebook
                </Button>
              )}
              autoLoad
              fields="name,email,picture"
              callback={responseFacebook}
              icon={<Facebook />}
            />
          </div>
          <div className="mb-3">
            <GoogleLogin
              clientId={clientId}
              render={renderProps => (
                <Button
                  theme="default"
                  hasIcon={<Google />}
                  handleClick={renderProps.onClick}
                >
                  Sign up with Google
                </Button>
              )}
              onSuccess={responseGoogle}
              onFailure={handleLoginFailure}
            />
          </div>

          <div className={Styles.divider}>or</div>
          <div className=" mb-5 mt-4">
            <Input
              value={name}
              change={setName}
              label="Full Name"
              type="text"
              id="name"
            />
          </div>
          <div className="mb-5 ">
            <Input
              value={phone}
              change={setPhone}
              label="Phone Number"
              type="text"
              id="phone"
            />
          </div>
          <div className="mb-4 mt-4">
            <Button theme="primary" handleClick={handleClick}>
              Sign Up
            </Button>
          </div>
          <div id="errMsg"></div>
        </form>
      )}
    </>
  );
};

export default SignUp;
