import styled from "styled-components"
import MainLayout from "../Layout/MainLayout"
import Offer from "../components/HomeComponents/Offer/Offer"
import SaveCommission from "../components/HomeComponents/SaveCommission/SaveCommission"
import WhyHousee from "../components/HomeComponents/WhyHousee/WhyHousee"
import Image from "next/image"
import SelectType from "../components/HomeComponents/SearchForm/SelectType"
import { Particle } from "../components/HomeComponents/Particle/Particle"
import NavBar from "../components/HomeComponents/MainPageNavBar/NavBar"
import MobileForm from "../components/HomeComponents/MobileForm/MobileForm"
import useWindowSize from "../hooks/useWindowSize"
import NavMenu from "../components/ListingComponents/NavMenu/NavMenu"

const TopHeader = styled.div`
  width: 100%;
  height: 467px;
  min-width: 100%;
  min-height: 100%;
  position: relative;
`

export default function Home() {
  const size = useWindowSize()

  return (
    <MainLayout title="Main">
      <div className="flex flex-col overflow-hidden sm:overflow-visible">
        <TopHeader>
          <Image src="/static/slider1.png" layout="fill" objectFit="cover" quality="100" />
          <Particle />
          {size > 857 ? <NavBar /> : <NavMenu />}

          {size > 768 ? <SelectType /> : <MobileForm />}
        </TopHeader>

        <Offer />
        <SaveCommission />
        <WhyHousee />
      </div>
    </MainLayout>
  )
}
