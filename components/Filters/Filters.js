import Image from "next/image"
import React, { useState } from "react"
import { MoreMenuFilters, MyFilters, SearchFilters } from "../../styles/StyledComponents"
import SelectDropDown from "../HomeComponents/SearchForm/Select"
import { filterHouseType, filterHouseRoom } from "./datas"
import useFormFields from "../../hooks/useFormFields"
import Input from "../Input/Input"
import MoreFilters from "../ListingComponents/MoreFilters/MoreFilters"

const Filters = ({ filterHandler }) => {
  const [moreFilters, setMoreFilters] = useState(false)
  const [moreMobileFilters, setMoreMobileFilters] = useState(false)
  const [filterOptions, setfilterOptions] = useState([])

  const { formFields, createChangeHandler } = useFormFields({
    search: "",
    type: filterHouseType[0],
    roomCount: filterHouseRoom[1],
    bathroomCount: 1,
    parkingCount: 1,
    minPrice: 0,
    maxPrice: 0
  })

  const searchHandler = () => {
    filterHandler({ filterOptions, formFields })
  }

  const filterBySearch = (v) => {
    createChangeHandler("search")(v)
    searchHandler()
  }

  const changeOptions = (options) => {
    setfilterOptions(options)
  }

  return (
    <MyFilters className="w-full flex flex-col items-center justify-center flex-wrap lg:flex-nowrap">
      <div className="flex w-full lg:w-8/12 flex-wrap lg:flex-nowrap justify-around m-auto items-center">
        <div className="w-5/12 px-3">
          <Input
            value={formFields.search}
            change={(v) => filterBySearch(v)}
            theme="default"
            type="text"
            placeholder="Los Angeles"
            hasIcon={
              <Image
                src="/icons/search-icon.svg"
                layout="fixed"
                width="15"
                height="15"
                className="z-30 relative"
              />
            }
          />
        </div>
        <div className="flex flex-wrap lg:flex-nowrap w-5/12 justify-around">
          <div className="w-2/6 mx-2">
            <SelectDropDown
              defaultSelected={formFields.type.title}
              selectOnChange={createChangeHandler("type")}
              options={filterHouseType}
              label="Rent"
              theme="dd-wrapper-secondary"
            />
          </div>
          <div className="w-2/6 mx-2">
            <SelectDropDown
              defaultSelected="Beds"
              selectOnChange={createChangeHandler("roomCount")}
              options={filterHouseRoom}
              label="Beds"
              theme="dd-wrapper-secondary"
            />
          </div>
          <div className="w-2/6 mx-2">
            <SelectDropDown
              defaultSelected="Bathroom"
              selectOnChange={createChangeHandler("bathroomCount")}
              options={filterHouseRoom}
              label="Beds"
              theme="dd-wrapper-secondary"
            />
          </div>
          <div className="w-2/6 mx-2">
            <SelectDropDown
              defaultSelected="Parking"
              selectOnChange={createChangeHandler("parkingCount")}
              options={filterHouseRoom}
              label="Bath"
              theme="dd-wrapper-secondary"
            />
          </div>
        </div>

        <div className="h-9 my-2 ">
          <MoreMenuFilters className="h-full" onClick={() => setMoreFilters(!moreFilters)}>
            {moreFilters ? "Less" : "More"}
            Filters
          </MoreMenuFilters>
        </div>
        <div className="h-9 ml-2 my-2 ">
          <SearchFilters className="h-full">Search</SearchFilters>
        </div>
      </div>
      {moreFilters && <MoreFilters setfilterOptions={(options) => changeOptions(options)} />}
    </MyFilters>
  )
}

export default Filters
