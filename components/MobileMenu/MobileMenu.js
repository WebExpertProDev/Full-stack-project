/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/no-autofocus */
/**
 *
 * MobileMenu
 *
 */
import React, { useState } from "react"
import Input from "../Input/Input"
import Button from "../Button/Button"
import { dashboardItems, linkitems } from "./data"

// svg
// import Search from "./svg/search.svg"
// import Arrow from "./svg/down.svg"
// import Close from "./svg/close.svg"
// import Profile from "./svg/profile.svg"
// import Arrowdown from "./svg/arrow.svg"

// styles
import styles from "./styles.module.css"
import Image from "next/image"
import styled from "styled-components"

const HamburgerMenu = styled.div`
  background-color: white;
  min-height: 100vh;
  width: 63%;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1070;
`

const MobileMenu = ({ CloseMenu }) => {
  const [profileDrop, setProfileDrop] = useState(false)
  const [selected, setSelected] = useState()
  const [title, setTitle] = useState("Buy")
  return (
    <>
      <div className={styles.hamburgerMenu}>
        <header className="flex justify-between items-center px-2 border-b-2 border-gray-300">
          <div className={`ml-3 ${styles.profile}`}>
            <div className={styles["profile-img"]}>
              <Image
                src="/static/icons/profile.svg"
                layout="fixed"
                width="30"
                height="30"
                className=""
                alt="profile"
              />
            </div>

            <span
              role="button"
              tabIndex={0}
              onKeyDown={() => setProfileDrop(!profileDrop)}
              className={`m-2 flex justify-center items-center w-full h-10`}
              onClick={() => setProfileDrop(!profileDrop)}>
              <p className="mr-2">Dashboard</p>
              <Image
                src="/static/icons/down.svg"
                layout="fixed"
                width="15"
                height="15"
                className="z-30"
                alt="open menu"
              />
            </span>
          </div>
          <div className={`${styles["close-btn"]}`}>
            <Image
              src="/static/icons/close.svg"
              layout="fixed"
              width="15"
              height="15"
              className="z-30"
              alt="open menu"
              onClick={() => CloseMenu()}
            />
          </div>
        </header>

        {profileDrop && (
          <div className={styles["dashboard-dropdown"]}>
            <ul>
              {dashboardItems.map((item) => (
                <li key={item.id}>
                  {item.item == "Sign Out" ? (
                    <span className="font-extrabold">{item.item}</span>
                  ) : (
                    <span>{item.item}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={`${styles["search-wrapper"]} py-3`}>
          <div>
            <Input
              autoFocus
              hasIcon={
                <Image
                  src="/static/icons/search.svg"
                  layout="fixed"
                  width="15"
                  height="15"
                  className="z-30"
                  alt="search"
                />
              }
              theme="menuInput"
              type="text"
            />
          </div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2">
            <Button
              theme="outline-gray"
              size="md"
              height="42px"
              font="13px"
              borderRadius="0px"
              handleClick={() => setTitle("Rent")}
              active={title === "Rent"}>
              Rent
            </Button>
          </div>
          <div className="w-1/2">
            <Button
              theme="outline-gray"
              size="md"
              height="42px"
              handleClick={() => setTitle("Buy")}
              active={title === "Buy"}
              font="13px"
              borderRadius="0px">
              Buy
            </Button>
          </div>
        </div>
        <div className={styles["hamburger-links"]}>
          <ul className={`${styles["sub-list"]}`}>
            {linkitems.map((link) => (
              <li
                className="focus:outline-none"
                key={link.id}
                onClick={() => {
                  if (selected == link.sublink) {
                    setSelected(!link.sublink)
                  } else {
                    setSelected(link.sublink)
                  }
                }}>
                <span>{link.sublink}</span>

                <Image
                  src="/static/icons/arrow.svg"
                  layout="fixed"
                  width="15"
                  height="15"
                  className="z-30"
                  alt="arrow"
                />
                {selected === link.sublink ? (
                  <ul className={`${styles["nested-list"]}`}>
                    {link.links.map((i, index) => (
                      <li key={index} className="">
                        <a href={`/${i.path}`}>{i.link}</a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default MobileMenu
