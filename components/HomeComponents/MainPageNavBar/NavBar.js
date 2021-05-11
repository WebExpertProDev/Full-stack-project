import Image from "next/image"
import { MenuItems, Nav, SignInButton } from "../../../styles/StyledComponents"
import { headerLinks } from "./Data"
import DropMenu from "./DropMenu/DropMenu"

const NavBar = () => {
  return (
    <Nav>
      <div className="flex justify-between animate__animated animate__fadeInUp w-full mx-3 lg:w-10/12">
        <Image
          src="/static/logo-menu.svg"
          className="z-30"
          layout="fixed"
          width="150"
          height="20"
          objectFit="cover"
          quality="100"
        />

        <MenuItems>
          <ul>
            {headerLinks.map((headerLink) => (
              <DropMenu key={headerLink.id} items={headerLink} />
            ))}
          </ul>
          <SignInButton>Sign in</SignInButton>
        </MenuItems>
      </div>
    </Nav>
  )
}

export default NavBar
