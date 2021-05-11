import { useRouter } from "next/router"
import MainLayout from "../../Layout/MainLayout"
import NavMenu from "../../components/ListingComponents/NavMenu/NavMenu"
import styled from "styled-components"
import useWindowSize from "../../hooks/useWindowSize"
import Overview from "../../components/DetailComponents/Overview/Overview"
import Slider from "../../components/DetailComponents/Slider/Slider"
import Description from "../../components/DetailComponents/Description/Description"
import Feature from "../../components/DetailComponents/Feature/Feature"
import MobileFeature from "../../components/DetailComponents/MobileFeature/MobileFeature"
import MobileButtons from "../../components/DetailComponents/MobileButtons/MobileButtons"
import MapTabs from "../../components/DetailComponents/MapTabs/MapTabs"
import Occordion from "../../components/DetailComponents/Occordion/Occordion"
import SimilarHomesList from "../../components/DetailComponents/SimilarHomesList/SimilarHomesList"
import { NearbyHomeList } from "../../components/DetailComponents/NearbyHomeList/NearbyHomeList"

const NewFilters = styled.ul`
  li {
    margin-left: 15px;
    margin-right: 15px;
    color: #c7c7c7;
    font-size: 1.0625rem;
  }
`

const Detail = () => {
  const router = useRouter()
  const { id } = router.query
  const size = useWindowSize()
  return (
    <MainLayout title={id}>
      <div className="flex flex-col justify-between h-auto">
        <NavMenu />
        {size > 600 ? (
          <div className="bg-white w-full h-16 border-b-2 border-gray-300 flex justify-center items-center">
            <NewFilters className="flex justify-around flex-wrap w-9/12 m-auto">
              <li>Overview</li>
              <li>Property Details</li>
              <li>Property History</li>
              <li>Tour Insights</li>
              <li>Public</li>
              <li>Facts</li>
              <li>Neighborhood</li>
              <li>Similar Homes</li>
            </NewFilters>
          </div>
        ) : null}
        <Overview />
        <Slider />
        <Description />
        {size > 640 ? <Feature /> : <MobileFeature />}
        {size < 640 ? <MobileButtons /> : null}
        <MapTabs />
        <Occordion />
        <SimilarHomesList />
        <NearbyHomeList />
      </div>
    </MainLayout>
  )
}

export default Detail
