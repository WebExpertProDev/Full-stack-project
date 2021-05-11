import React, { useState } from "react"
import NewTour from "../../components/DetailComponents/Overview/Layout/NewTour/NewTour"
import TourDate from "../../components/DetailComponents/Overview/Layout/TourDate/TourDate"
import NavMenu from "../../components/ListingComponents/NavMenu/NavMenu"
import MainLayout from "../../Layout/MainLayout"

const Tour = () => {
  const pages = [
    {
      id: 1,
      component: NewTour
    },
    {
      id: 2,
      component: TourDate
    }
    // {
    //   id: 3,
    //   component: RentMyHome3
    // },
    // {
    //   id: 4,
    //   component: ChooseDate
    // },
    // {
    //   id: 5,
    //   component: SellPremium
    // },
    // {
    //   id: 6,
    //   component: SellPrice
    // }
  ]
  const [currentPage, setCurrentPage] = useState(pages[0])

  const changePage = (pageId) => {
    setCurrentPage(pages[pageId])
  }
  return (
    <MainLayout title="Schedule tour">
      <div className="flex flex-col justify-between h-auto">
        <NavMenu />

        <currentPage.component changePageHandler={changePage} />
      </div>
    </MainLayout>
  )
}

export default Tour
