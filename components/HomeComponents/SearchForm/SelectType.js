import React from "react"
import { SelectDropDown } from "./Select"
import { filterHouseType } from "./data"
import Image from "next/image"
import Link from "next/link"
// styles
import styles from "./SelectType.module.css"
import { SearchButton } from "../../../styles/StyledComponents"

export const SelectType = () => {
  return (
    <div className="animate__animated animate__bounceInRight animate__delay-2s flex">
      <div className="w-full flex justify-center lg:justify-end mr-16">
        <div className="flex justify-center">
          <form className={styles["hero-form"]}>
            <div className="w-1/2">
              <SelectDropDown
                autocomplate
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
                defaultSelected="Your City"
              />
            </div>

            <span className={styles.path} />
            <div className={styles["rent-select"]}>
              <SelectDropDown options={filterHouseType} defaultSelected="Rent House" />
            </div>

            {/* TODO - convert to custom button component */}
            <Link href="/listing">
              <SearchButton className="text-white">Search</SearchButton>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SelectType
