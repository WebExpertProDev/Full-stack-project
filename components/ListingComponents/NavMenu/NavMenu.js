import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Drawer from "react-modern-drawer"

import styled from "styled-components"
import useWindowSize from "../../../hooks/useWindowSize"
import MobileMenu from "../../MobileMenu/MobileMenu"
import { Menu, MenuContainer } from "./NavMenuStyles"

const HamburgerMenu = styled.div`
  display: none;
  @media (max-width: 857px) {
    span {
      background-color: #a7a7a7;
      height: 3px;
      width: 30px;
      margin-top: 0.4em;
      display: block;
      border-radius: 5px;
    }
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 2rem;
    top: -8px;
    cursor: pointer;
  }
`

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const size = useWindowSize()

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      <Drawer open={isOpen} onClose={toggleDrawer} direction="right">
        <MobileMenu CloseMenu={() => setIsOpen(false)} />
      </Drawer>
      <MenuContainer className="w-full flex items-center justify-center lg:justify-around top-0 sticky h-20 z-30">
        <div className="flex w-full lg:w-11/12 lg:items-center justify-center lg:justify-around  animate__animated animate__fadeInUp">
          <Link href="/">
            <Image
              src="/static/logo-black.svg"
              className="z-30 cursor-pointer"
              layout="fixed"
              width="150"
              height="20"
              objectFit="cover"
              quality="100"
            />
          </Link>
          <HamburgerMenu
            className="hambg"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
            tabIndex={-1}
            role="button">
            <span />
            <span />
            <span />
          </HamburgerMenu>
          {size > 857 ? (
            <Menu>
              <li>| Find a home</li>
              <li>| Sell your home</li>
              <li>| Rent your home</li>
              <li>| Join housee</li>
              <li>| User</li>
              <Image
                src="/static/user-icon.svg"
                className="z-30"
                layout="fixed"
                width="25"
                height="25"
                objectFit="cover"
                quality="100"
              />
            </Menu>
          ) : (
            ""
          )}
        </div>
      </MenuContainer>
    </>
  )
}

export default NavMenu
