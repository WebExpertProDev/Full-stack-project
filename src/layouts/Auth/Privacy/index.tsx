/**
 *
 * Privacy
 *
 */
import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import userContext from "../../../context/userContext";
// styles
import Styles from "./styles/Privacy.module.scss";

// components
import Button from "../../../components/Button";
import Verification from "../Verification";
import { IPrivacy } from "./Privacy";

export const Privacy: React.FunctionComponent<IPrivacy.IProps> = ({
  phoneNum,
  name,
  DeclinePrivacy,
  useEmail,
  cleanName,
  cleanPhone, type
}) => {
  const [showPrivacy, setShowPrivacy] = useState<Boolean>(false);
  const [acceptConditions, setAcceptConditions] = useState<Boolean>(false);
  const { user, setUser } = useContext(userContext);
  const router = useRouter();
  const Decline = () => {
    DeclinePrivacy(false);
    cleanName("");
    cleanPhone("");
    return;
  };
  const changePage = () => {
      if (useEmail) {
        console.log("using email")
        //connect with backend and sign up
        const request = new Request(
          "http://localhost:5000/api/externaluser/signup",
          {
            method: "POST",
            body: JSON.stringify({ userType: type, email: phoneNum,
            username: name}),
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json"
            }
          }
        );
        fetch(request)
          .then(res => {
            console.log(res.status);
            if (res.status === 200) {
              return res.json();
            } else {
              console.log("errno"+res.status);
              return;
            }
          })
          .then(data => {
            console.log("feed back from signin:" + data);
            return;
          })
          .catch(err => console.log("error"));
          //email Sign Up
          const signInrequest = new Request(
            "http://localhost:5000/api/externaluser/signin",
            {
              method: "POST",
              body: JSON.stringify({ email: phoneNum,
              username: name}),
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
                console.log("errno"+res.status);
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
        setUser(phoneNum);
        window.localStorage.setItem("email", phoneNum);
        window.localStorage.setItem("username", name);
        console.log(user);
        router.reload();
      } else {
        const request = new Request(
          "http://localhost:5000/api/sendCode/getPhone",
          {
            method: "POST",
            body: JSON.stringify({ phone: phoneNum }),
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json"
            }
          }
        );
        fetch(request)
          .then(res => {
            console.log("sent to " + phoneNum);
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
            setShowPrivacy(true);
            return;
          })
          .catch(err => console.log("error"));
      }
  
  };
  return (
    <>
      {showPrivacy ? (
        <Verification
          userPhone={phoneNum}
          userOTP={localStorage.getItem("OTP")}
          userName={name}
        />
      ) : (
        <div>
          <div className={Styles.privacy}>
            <h4> Privacy policy</h4>
            <h5>Automatic collection of information</h5>
            <p>
              When you visit the Website our servers automatically record
              information that your browser sends. This data may include
              information such as your device's IP address, browser type and
              version, operating system type and version, language preferences
              or the webpage you were visiting before you came to our Website,
              pages of our Website that you visit, the time spent on those
              pages, information you search for on our Website, access times and
              dates, and other statistics.
            </p>

            <p>
              Information collected automatically is used only to identify
              potential cases of abuse and establish statistical information
              regarding Website usage. This statistical information is not
              otherwise aggregated in such a way that would identify any
              particular user of the system.
            </p>

            <h5>Collection of personal information</h5>
            <p>
              You can visit the Website without telling us who you are or
              revealing any information by which someone could identify you as a
              specific, identifiable individual. If, however, you wish to use
              some of the Website's features, you may be asked to provide
              certain Personal Information (for example, your name and e-mail
              address). We receive and store any information you knowingly
              provide to us when you create an account, publish content, make a
              purchase, or fill any online forms on the Website. When required,
              this information may include the following: Personal details such
              as name, country of residence, etc. Contact information such as
              email address, address, etc. Account details such as user name,
              unique user ID, password, etc. Proof of identity such as photocopy
              of a government ID. Payment information such as credit card
              details, bank details, etc. Information about other individuals
              such as your family members, friends, etc. Any other materials you
              willingly submit to us such as articles, images, feedback, etc.
              You can choose not to provide us with your Personal Information,
              but then you may not be able to take advantage of some of the
              Website's features. Users who are uncertain about what information
              is mandatory are welcome to contact us.
            </p>
          </div>

          <div
            className={`w-100  d-flex align-items-between ${Styles.bottomSection}`}
          >
            <div className={Styles.selectInput}>
              <input
                type="checkbox"
                onClick={() => setAcceptConditions(true)}
              />
              <p>Accept terms and conditions</p>
            </div>
            <div className={Styles.groupBtn}>
              <div className={Styles.acceptBtn}>
                <Button theme="primary" handleClick={changePage} disabled={!acceptConditions}>
                  Accept
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Privacy;
