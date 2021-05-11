import React, { useEffect, useState } from "react"
import { Flipper, Flipped } from "react-flip-toolkit"
import styled from "styled-components"
import Map from "../components/ListingComponents/Map/Map"
import NavMenu from "../components/ListingComponents/NavMenu/NavMenu"
import MainLayout from "../Layout/MainLayout"
import useWindowSize from "../hooks/useWindowSize"
import styles from "../styles/Listing.module.css"
import Filters from "../components/Filters/Filters"
import { Select } from "../styles/StyledComponents"
import HouseCardList from "../components/ListingComponents/HouseCardList/HouseCardList"
import Paginator from "../components/ListingComponents/Paginator/Paginator"
import MobileSlideCart from "../components/ListingComponents/MobileSlideCart/MobileSlideCart"

const SecondFilters = styled.div`
  display: flex;
  width: 20%;

  .hidebtn {
    font-family: SemiBoldFont;
    width: 100px;
  }
  @media (max-width: 991px) {
    justify-content: center;
    width: 100%;
  }

  .selectbtn {
    width: 20%;
    min-width: 118px;
    margin-left: 0.7rem;
  }
`

const DisplayMap = styled.button`
  border-radius: 5px;
  background-color: #fff;
  color: #00bbd8;
  border: 1px solid #00bbd8;
  max-width: 200px;
  padding: 0.375rem 0.75rem;
  font-weight: 700;
  width: max-content;
`

const Listing = () => {
  const size = useWindowSize()

  const [showMap, setShowMap] = useState(true)

  // useEffect(() => {
  //   if (size < 1024) {
  //     setShowMap(false)
  //   }
  // }, [size])

  const setFilterOnData = ({ filterOptions, formFields }) => {
    let filterdData = cardItems
    const searchString = formFields.search ? formFields.search.toString() : ""

    // Filter By  search
    if (searchString !== "") {
      filterdData = cardItems.filter((option) => {
        const searchByAddress =
          option.address.toLowerCase().indexOf(searchString.toLowerCase()) > -1
        const searchByCity = option.city.toLowerCase().indexOf(searchString.toLowerCase()) > -1

        return searchByCity || searchByAddress
      })
    }
    // Filter By Type (Rent/Buy)
    filterdData = filterdData.filter((option) => {
      const typeOption = option.type === formFields.type.title.toLowerCase()
      const bedsOption = option.bed === Number(formFields.roomCount.title)

      const filterByMinPrice =
        formFields.minPrice !== 0 ? option.price > Number(formFields.minPrice) : true
      const filterByMaxPrice =
        formFields.maxPrice !== 0 ? option.price < Number(formFields.maxPrice) : true

      return typeOption && bedsOption && filterByMinPrice && filterByMaxPrice
    })

    setdata(filterdData)
  }

  const cardItems = [
    {
      img:
        "https://images.adsttc.com/media/images/5e1d/02c3/3312/fd58/9c00/06e9/large_jpg/NewHouse_SA_Photo_01.jpg?1578959519",
      city: "2545 Medlow Ave",
      id: 1,
      address: "South Park - Los Angeles, CA 90017",
      price: 334000,
      sqft: 1100,
      bed: 2,
      bt: 2,
      type: "rent",
      features: ["Furnished", "Bicycle Parking", "Security System"]
    },
    {
      img:
        "https://images.unsplash.com/photo-1576941089067-2de3c901e126?ixlib=rb-1.2.1&w=1000&q=80",
      city: "2545 Medlow Ave",
      id: 2,
      address: "some - Los Angeles, CA 90018",
      price: 334000,
      sqft: 1100,
      bed: 2,
      bt: 2,
      type: "rent",
      features: ["Hardwood Floors"]
    },
    {
      img: "https://i.pinimg.com/originals/7a/62/29/7a62294ccce9a6a40fa392ddac3669fb.jpg",
      city: "2545 Medlow Ave",
      id: 3,
      address: "South Park - Los Angeles, CA 90017",
      price: 334000,
      sqft: 1100,
      bed: 2,
      bt: 2,
      type: "rent",
      features: ["Hardwood Floors"]
    },
    {
      img:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg",
      city: "2545 Medlow Ave",
      address: "South Park - Los Angeles, CA 90017",
      id: 4,
      price: 334000,
      sqft: 1100,
      bed: 2,
      bt: 2,
      type: "rent",
      features: [
        "Furnished",
        "Bicycle Parking",
        "Security System",
        "Bicycle Parking",
        "Hardwood Floors"
      ]
    },
    {
      img:
        "https://www.livinspaces.net/wp-content/uploads/2019/09/House-Desai-25_Metropole-Architects.jpg",
      city: "2545 Medlow Ave",
      address: "South Park - Los Angeles, CA 90017",
      price: 334000,
      id: 5,
      sqft: 1100,
      bed: 1,
      bt: 2,
      type: "buy",
      features: [
        "Furnished",
        "Bicycle Parking",
        "Security System",
        "Bicycle Parking",
        "Hardwood Floors"
      ]
    },
    {
      img:
        "https://www.livinspaces.net/wp-content/uploads/2019/09/House-Desai-25_Metropole-Architects.jpg",
      city: "99999 Medlow Ave",
      address: "South Park - Los Angeles, CA 90017",
      price: 334000,
      id: 6,
      sqft: 1100,
      bed: 3,
      bt: 2,
      type: "buy",
      features: [
        "Furnished",
        "Bicycle Parking",
        "Security System",
        "Bicycle Parking",
        "Hardwood Floors"
      ]
    },
    {
      img:
        "https://www.livinspaces.net/wp-content/uploads/2019/09/House-Desai-25_Metropole-Architects.jpg",
      city: "999999 Medlow Ave",
      address: "South Park - Los Angeles, CA 90017",
      id: 7,
      price: 334000,
      sqft: 1100,
      bed: 2,
      bt: 2,
      type: "buy",
      features: ["Furnished", "Bicycle Parking"]
    },
    {
      img:
        "https://www.realestate.com.au/blog/images/800x500-fit,progressive/2019/08/19163753/beechwood-home.jpg",
      city: "999999 Medlow Ave",
      address: "South Park - Los Angeles, CA 90017",
      price: 334000,
      id: 8,
      sqft: 1100,
      bed: 2,
      bt: 2,
      type: "buy",
      features: ["Furnished", "Bicycle Parking"]
    },
    {
      img:
        "https://www.realestate.com.au/blog/images/800x500-fit,progressive/2019/08/19163753/beechwood-home.jpg",
      city: "999999 Medlow Ave",
      address: "South Park - Los Angeles, CA 90017",
      price: 334000,
      id: 9,
      sqft: 1100,
      bed: 2,
      bt: 2,
      type: "buy",
      features: ["Furnished", "Bicycle Parking"]
    }
  ]

  const [data, setdata] = useState(cardItems)
  const [currentPage, setcurrentPage] = useState(1)
  const [pagesCount, setpagesCount] = useState(0)
  useEffect(() => {
    const count = cardItems.length / 10
    setpagesCount(Math.round(count))
  }, [data])

  const backPage = () => {
    setcurrentPage((prev) => (prev > 0 ? prev - 1 : 0))
  }

  const nextPage = () => {
    setcurrentPage((prev) => prev + 1)
  }

  const gotoPage = (page) => {
    setcurrentPage(page)
  }

  return (
    <MainLayout title="listing">
      <div className="flex flex-col items-center justify-between">
        <NavMenu />
        {size < 857 ? null : <Filters filterHandler={setFilterOnData} />}

        <div className="w-full flex flex-col lg:flex-row justify-center items-center pt-5 order-1">
          <SecondFilters>
            <div className="hidebtn mx-5">
              <DisplayMap onClick={() => setShowMap(!showMap)}>
                {showMap ? "hide map " : "show map"}
              </DisplayMap>
            </div>
            <div className="w-1/4">
              <Select className="w-7/12" defaultSelected="Sort by" label="Sort by">
                <option value="rent">Rent</option>
              </Select>
            </div>
          </SecondFilters>
        </div>

        <div className="relative top-0 w-full lg:h-auto order-2">
          <Flipper
            translate
            flipKey={showMap}
            className={`flex flex-wrap  ${
              !showMap ? "justify-center w-full flex-col md:ml-10" : "flex-col md:flex-row w-full"
            } `}>
            <Flipped flipId="square" className="flex">
              {showMap && (
                <div className="w-full md:w-4/12 md:ml-10">
                  <div className="w-full h-screen md:h-full mt-4">
                    <Map />
                  </div>
                </div>
              )}
            </Flipped>

            <Flipped flipId="square">
              <div className={`${!showMap ? styles.housecardmap : styles.housecard}`}>
                {size > 714 ? (
                  <HouseCardList cardItems={cardItems} cartLayout={showMap} />
                ) : !showMap ? (
                  <div className=" ">
                    <HouseCardList cardItems={cardItems} cartLayout={showMap} />
                  </div>
                ) : (
                  <MobileSlideCart />
                )}
              </div>
            </Flipped>
          </Flipper>
          <div className="flex flex-col items-center justify-center mt-5 mb-5 animate__animated animate__fadeInUp order-3">
            <Paginator
              handler={gotoPage}
              count={Array.from({ length: pagesCount }, (_, i) => i + 1)}
              backHandler={nextPage}
              nextHandler={backPage}
              current={currentPage}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Listing
