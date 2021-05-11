/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react"
import classNames from "classnames"

// Static data
import chunk from "./chunk"
import { filters } from "./data"

import styles from "./MoreFilters.module.css"

import Image from "next/image"

export const MoreFilters = ({ setfilterOptions }) => {
  const [search, setsearch] = useState("")
  const [selectedItem, setselectedItem] = useState([])
  const [options, setOptions] = useState(filters)

  const [minPrice, setMinPrice] = useState(1)
  const [maxPrice, setMaxPrice] = useState(0)

  useEffect(() => {
    setfilterOptions(selectedItem)
  }, [selectedItem])

  const filteredSuggestions = filters.filter(
    (option) => option.title.toLowerCase().indexOf(search.toLowerCase()) > -1
  )

  const rows = chunk(options, 5)

  const searchHandler = (e) => {
    if (e.target.value.length === 0) {
      setsearch(e.target.value)
      setOptions(filters)
      return true
    }

    setOptions(filteredSuggestions)
    setsearch(e.target.value)
    return true
  }

  const selectItem = (item) => {
    // de Select Item
    const existed = selectedItem.filter((i) => i.title === item.title)
    let curentItems

    if (existed.length !== 0) {
      curentItems = selectedItem.filter((i) => i.title !== item.title)
      setselectedItem(curentItems)
    } else {
      // add Item
      const items = selectedItem
      items.push(item)
      setselectedItem(items)
    }

    // change option
    const soptions = options.map((i) => {
      if (i.title === item.title) {
        i.status = !i.status
      }
      return i
    })

    setOptions(soptions)
  }
  return (
    <section className="my-10 w-full">
      <div className="w-full">
        <div className="flex justify-center w-8/12 m-auto ">
          <div className="flex flex-col w-6/12 mx-4">
            <label htmlFor="search" className={styles.label}>
              Search Option
            </label>
            <div className="flex items-center w-full h-auto">
              <div className="absolute mt-1 mx-2">
                <Image
                  className="z-20"
                  src="/static/icons/search.svg"
                  layout="fixed"
                  width="20"
                  height="20"
                />
              </div>
              <input
                className="border-2 rounded-md w-full h-9 pl-10"
                value={search}
                onChange={searchHandler}
                type="text"
              />
            </div>
          </div>
          <div className="w-3/12 mx-4">
            <label htmlFor="search" className={styles.label}>
              MinPrice
            </label>

            <input
              className="border-2 h-8 rounded-md w-full"
              type="number"
              min="1"
              max="999"
              onChange={setMinPrice}
            />
          </div>
          <div className="w-3/12 mx-4">
            <label htmlFor="search" className={styles.label}>
              MaxPrice
            </label>
            <input
              className="border-2 h-8 rounded-md w-full"
              type="number"
              min="1"
              max="999"
              onChange={setMinPrice}
            />
          </div>
        </div>
        <div className="flex justify-center w-full mt-4 mb-5 pb-4">
          {rows.map((cols) => (
            <div className={`${styles.filters}`}>
              {cols.map((filter, index) => (
                <div
                  onKeyPress={() => selectItem(filter)}
                  onClick={() => selectItem(filter)}
                  key={index}
                  className={`${classNames("mt-3", {
                    [styles.selected]: filter.status
                  })} flex items-center mx-8`}>
                  <Image src={filter.svg} layout="fixed" width="50" height="50" />
                  <span className="pl-lg-4 pl-2">{filter.title}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MoreFilters
