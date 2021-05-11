/**
 *
 * SignUp
 *
 */
import React, { useState } from "react";

// components
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Privacy from "../Privacy";

// svg
import Facebook from "../svg/facebook.svg";
import Google from "../svg/google.svg";
import HiddenPass from "../svg/eye-slash-solid.svg";

// styles
import Styles from "./styles/SignUp.module.scss";

export const SignUp: React.FunctionComponent = () => {
  const [showPrivacy, setShowPrivacy] = useState<Boolean>(false);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  // const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const handleClick = () => {
    // if (password == passwordConfirm) {
    //   setShowPrivacy(true);
    //   return;
    // } else {
    //   var err = document.getElementById("errMsg");
    //   err.style.color = "red";
    //   err.innerHTML = "Password and Confirm Password must match!";
    //   return;
    // }
    setShowPrivacy(true);
    return;
  };

  return (
    <>
      {showPrivacy ? (
        <Privacy phoneNum={phone} name={name} DeclinePrivacy={setShowPrivacy}/>
      ) : (
        <form>
          <p className={Styles.title}>Sign Up</p>
          <div className="mb-3">
            <Button hasIcon={<Facebook />} theme="default">
              Sign up with Facebook
            </Button>
          </div>
          <div className="mb-3">
            <Button hasIcon={<Google />} theme="default">
              Sign up with Google
            </Button>
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
          {/* <div className="mb-5 ">
            <Input
              value={password}
              change={setPassword}
              label="Password"
              type="Password"
              hasIcon={<HiddenPass />}
              id="pass"
            />
          </div> */}
          {/* <div>
            <Input
              value={passwordConfirm}
              change={setPasswordConfirm}
              label="Confirm Password"
              type="Password"
              hasIcon={<HiddenPass />}
              id="confirmpass"
            />
          </div> */}
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
