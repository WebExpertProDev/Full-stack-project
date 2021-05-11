import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import Button from "../../Button/Button"
import SelectDropDown from "../SearchForm/Select"
import styles from "./MobileForm.module.css"

const MobileForm = () => {
  const [title, setTitle] = useState("")

  return (
    <form className="w-full top-44 md:top-auto m-auto flex justify-center flex-wrap rounded-md relative">
      <div className="flex w-full justify-center">
        <div className="flex flex-col w-6/12">
          <div className="rounded border border-gray-400 w-full h-full">
            <SelectDropDown
              autocomplate
              hasIcon={
                <Image src="/static/icons/search.svg" layout="fixed" width="20" height="20" />
              }
              theme="dd-wrapper"
              defaultSelected="Find City"
            />
          </div>
          <div className="flex">
            <div className="w-1/2">
              <Button
                theme="outline-gray"
                size="md"
                height="42px"
                font="13px"
                borderRadius="0px"
                handleClick={() => setTitle("Rent")}
                customStyles={{ borderBottomLeftRadius: "4px", color: "#a7a7a7" }}
                active={title === "Rent"}>
                Rent
              </Button>
            </div>

            <div className="w-1/2">
              <Button
                theme="outline-gray"
                size="md"
                height="42px"
                font="13px"
                borderRadius="0px"
                customStyles={{ color: "#a7a7a7" }}
                handleClick={() => setTitle("Buy")}
                active={title === "Buy"}>
                Buy
              </Button>
            </div>
          </div>
        </div>

        {/* <SearchButton className="text-white" type="button">
          Search
        </SearchButton> */}
        <Link href="/listing">
          <button type="button" className={`${styles["search-btn"]} z-10`}>
            Search
          </button>
        </Link>
      </div>
    </form>
  )
}

export default MobileForm
