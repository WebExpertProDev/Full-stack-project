/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react"
import OutsideClickHandler from "react-outside-click-handler"
import Image from "next/image"

// Styles
import styles from "./select.module.css"

export const SelectDropDown = ({
  theme,
  options,
  autocomplate,
  selectOnChange,
  defaultSelected,
  hasIcon
}) => {
  const [listOpen, setListOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [showTextInput, setShowTextInput] = useState(false)
  const [selectedItem, setSelectedItem] = useState(defaultSelected || options[0].title)
  const [selectedOptions, setSelectedOptions] = useState(options)

  const toggleList = () => {
    setListOpen(!listOpen)
  }
  const filterTitle = (title) => {
    const length = 15
    return title.length > 15 ? `${title.substring(0, length)} ...` : title
  }

  // Filter our suggestions that don't contain the user's input
  const filteredSuggestions = options.filter(
    (option) => option.title.toLowerCase().indexOf(search.toLowerCase()) > -1
  )

  // eslint-disable-next-line consistent-return
  const searchHandler = (value) => {
    if (value.length === 0) {
      setSearch(value)
      setListOpen(false)
      setSelectedOptions(options)
      return false
    }
    setSearch(value)
    setSelectedOptions(filteredSuggestions)
    if (filteredSuggestions.length !== 0) {
      setListOpen(true)
    } else {
      setListOpen(false)
    }
  }

  const toggleItem = (item) => {
    setSelectedItem(item.title)
    if (selectOnChange) {
      selectOnChange(item)
    }
    setShowTextInput(false)
    setListOpen(false)
  }

  const myFilters = [
    {
      id: 0,
      title: "Vancouver, BC, Canada",
      selected: false,
      key: "location"
    },
    {
      id: 1,
      title: "Downtown Vancouver",
      selected: false,
      key: "location"
    },
    {
      id: 2,
      title: "West Vancouverlifornia",
      selected: false,
      key: "location"
    },
    {
      id: 3,
      title: "Nourth Vancouver",
      selected: false,
      key: "location"
    },
    {
      id: 4,
      title: "Vancouver Regional District ",
      selected: false,
      key: "location",
      svg: "/static/icons/RealEstate.svg"
    }
  ]

  const Item = ({ item }) => (
    <li
      onKeyDown={() => toggleItem(item)}
      className={item.svg ? "py-4 flex" : ""}
      key={item.id}
      onClick={() => toggleItem(item)}>
      {item.svg && <Image src={item.svg} layout="fixed" width="25" height="25" className="px-2" />}
      {item.title}
    </li>
  )

  const ListOption = ({ list }) => (
    <ul className={styles["dd-list"]}>
      {list.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  )

  return (
    <OutsideClickHandler
      display="contents"
      onOutsideClick={() => {
        if (listOpen) {
          setListOpen(false)
        }
      }}>
      <div
        className={styles[theme]}
        role="button"
        tabIndex={0}
        onClick={() => toggleList()}
        onKeyDown={() => toggleList()}>
        <div
          tabIndex={0}
          role="button"
          onKeyDown={() => setShowTextInput(true)}
          onClick={() => setShowTextInput(true)}
          className={styles["dd-header"]}>
          <div
            role="button"
            tabIndex={0}
            className={styles["dd-header-title"]}
            onClick={() => toggleList()}
            onKeyDown={() => toggleList()}>
            <span className={styles.Icon}>{hasIcon}</span>
            {autocomplate && showTextInput ? (
              <input
                onClick={() => toggleList()}
                onKeyDown={() => toggleList()}
                onChange={(e) => searchHandler(e.target.value)}
                className={styles.input}
                type="text"
              />
            ) : (
              <p className="mx-3">{filterTitle(selectedItem)}</p>
            )}
          </div>

          {listOpen ? (
            <>
              <Image
                src="/static/icons/arrow.svg"
                layout="fixed"
                width="15"
                height="15"
                className={styles.arrow}
                onClick={() => toggleList()}
                onKeyDown={() => toggleList()}
              />
            </>
          ) : (
            <Image
              src="/static/icons/arrow.svg"
              layout="fixed"
              width="15"
              height="15"
              className={styles.arrow}
              onClick={() => toggleList()}
              onKeyDown={() => toggleList()}
            />
          )}
        </div>
        {listOpen && <ListOption list={selectedOptions} />}
      </div>
    </OutsideClickHandler>
  )
}

// default props
SelectDropDown.defaultProps = {
  theme: "dd-wrapper",
  autocomplate: false,
  label: "title",
  options: [
    {
      id: 0,
      title: "Vancouver, BC, Canada",
      selected: false,
      key: "location"
    },
    {
      id: 1,
      title: "Downtown Vancouver",
      selected: false,
      key: "location"
    },
    {
      id: 2,
      title: "West Vancouverlifornia",
      selected: false,
      key: "location"
    },
    {
      id: 3,
      title: "Nourth Vancouver",
      selected: false,
      key: "location"
    },
    {
      id: 4,
      title: "Vancouver Regional District ",
      selected: false,
      key: "location",
      svg: "/static/icons/RealEstate.svg"
    }
  ]
}

export default SelectDropDown
