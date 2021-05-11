/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/control-has-associated-label */
/**
 *
 * MainHeader
 *
 */
import React, { useContext, useState } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import userContext from "../../context/userContext";

import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

import Particles from "react-particles-js";

// Static Data
import { headerLinks } from "../../staticData/common/data";

// components
import Link from "@Components/Link";
import DropMenu from "@Components/DropMenu";
import MobileMenu from "@Layouts/MobileMenu";
import AuthModal from "../Auth";

import HeaderForm from "../../containers/Home/layouts/HeaderForm";

// InterFaces
import { IHeader } from "./Header";

// svg
import Notific from "./svg/notification.svg";
import ProfileSvg from "./svg/profile.svg";
import Logo from "./svg/logo.svg";

// styles
import styles from "./styles/styles.module.scss";
import { useRouter } from "next/router";
import { request } from "https";

function addSegmentScript() {
  if (typeof window !== "undefined") {
    const script = document.createElement("script");
    const segmentApiKey = "gufIg232yYIA1AvVTxJuB1nZyqXVIRWI";
    script.append(
      `!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.13.1";analytics.load('${segmentApiKey}');analytics.page();}}();`
    );
    document.head.appendChild(script);
  }
}

const MainHeader: React.FunctionComponent<IHeader.IProps> = ({ Theme }) => {
  addSegmentScript();
  const router = useRouter();
  const { user, setUser } = useContext(userContext);
  //console.log(user, setUser);
  let isGuest = true,
    setGuest;
  let isOpen = false,
    setIsOpen;
  let modalStatus = false,
    setModalStatus;
  if (typeof window !== "undefined") {
    [modalStatus, setModalStatus] = useState<boolean>(false);
    [isGuest, setGuest] = useState<boolean>(user.username == null);
    [isOpen, setIsOpen] = useState<boolean>(false);
    if (isGuest && router.pathname !== "/") {
      router.push("/");
    }
  }

  const onSignOut = () => {
    const signOutRequest = new Request(
      "http://localhost:5000/api/user/signOut",
      {
        method: "POST",
        body: JSON.stringify({
          username: window.localStorage.getItem("username"),
          phone: window.localStorage.getItem("phone")
        }),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      }
    );
    fetch(signOutRequest);
    window.localStorage.clear();
    router.reload();
  };

  const SignInButton: React.FunctionComponent = () => (
    <button
      onClick={() => setModalStatus(true)}
      type="button"
      className={styles.headerBtn}
    >
      <span>Sign in</span>
    </button>
  );
  const DashboardDrop: React.FunctionComponent = () => (
    <li key="index">
      <Notific className={styles["notif-svg"]} />

      <NavDropdown
        id="1"
        renderMenuOnMount
        rootCloseEvent="click"
        title={user.username}
        bsPrefix={styles[`custom-${Theme}-title`]}
      >
        <NavDropdown.Item
          renderMenuOnMount
          rootCloseEvent="click"
          eventKey="4.1"
          bsPrefix={styles.customDrop}
          href="/listing"
        >
          Listings
        </NavDropdown.Item>
        <NavDropdown.Item
          renderMenuOnMount
          rootCloseEvent="click"
          eventKey="4.1"
          bsPrefix={styles.customDrop}
        >
          Profile Setting
        </NavDropdown.Item>
        <NavDropdown.Item
          renderMenuOnMount
          rootCloseEvent="click"
          eventKey="4.1"
          bsPrefix={styles.customDrop}
          onClick={onSignOut}
        >
          Sign Out
        </NavDropdown.Item>
      </NavDropdown>

      <ProfileSvg className={styles["profile-svg"]} />
    </li>
  );
  return (
    <>
      <header className={styles[`homeheader-${Theme}`]}>
        {Theme === "dark" && (
          <Particles
            params={{
              background: {
                color: {
                  value: "white"
                }
              },
              fpsLimit: 60,
              interactivity: {
                detectsOn: "canvas",
                events: {
                  onClick: {
                    enable: true,
                    mode: "push"
                  },
                  onHover: {
                    enable: true,
                    mode: "repulse"
                  },
                  resize: true
                },
                modes: {
                  bubble: {
                    distance: 10,
                    duration: 2,
                    opacity: 0.8,
                    size: 400
                  },
                  push: {
                    quantity: 6
                  },
                  repulse: {
                    distance: 50,
                    duration: 0.7
                  }
                }
              },
              particles: {
                color: {
                  value: "#ffffff"
                },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.5,
                  width: 1
                },
                collisions: {
                  enable: true
                },
                move: {
                  direction: "none",
                  enable: true,
                  outMode: "bounce",
                  random: false,
                  speed: 6,
                  straight: false
                },
                number: {
                  density: {
                    enable: true,
                    value_area: 800
                  },
                  value: 80
                },
                opacity: {
                  value: 0.5
                },
                shape: {
                  type: "circle"
                },
                size: {
                  random: true,
                  value: 5
                }
              },
              detectRetina: true
            }}
            style={{
              position: "absolute",
              width: "100vw",
              heigth: "50vh",
              minHeigth: "900px"
            }}
          />
        )}

        <Navbar className={styles[`nav-${Theme}`]}>
          <Container className="wow fadeInUp" fluid="xl">
            <Link href="/">
              <Navbar.Brand className={` mr-0 ${styles.logo}`}>
                <Logo />
              </Navbar.Brand>
            </Link>

            <Nav>
              <ul className={styles.navbar}>
                {headerLinks.map((headerLink, index) => (
                  <li key={index}>
                    <DropMenu
                      ids={index}
                      key={index}
                      title={headerLink.subTitle}
                      items={headerLink.links}
                      theme={Theme}
                    />
                  </li>
                ))}
                {!isGuest && <DashboardDrop />}
              </ul>

              {isGuest && <SignInButton />}

              <div
                className={styles["hamburger-menu"]}
                onClick={() => setIsOpen(true)}
                onKeyDown={() => setIsOpen(true)}
                tabIndex={-1}
                role="button"
              >
                <span />
                <span />
                <span />
              </div>
            </Nav>
          </Container>
        </Navbar>

        {/* backdrop */}

        {isOpen && (
          <div
            className={styles.backDrop}
            onClick={() => setIsOpen(false)}
            tabIndex={-1}
            role="button"
            onKeyDown={() => setIsOpen(false)}
          />
        )}

        {/* backdrop */}
        <CSSTransitionGroup
          transitionName="slide"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={10}
        >
          {isOpen ? <MobileMenu CloseMenu={() => setIsOpen(false)} /> : null}
        </CSSTransitionGroup>
        {/* form */}

        {Theme === "dark" ? <HeaderForm /> : null}
      </header>
      <AuthModal
        closeAuthModal={() => setModalStatus(false)}
        isOpen={modalStatus}
      />
    </>
  );
};

export default MainHeader;
