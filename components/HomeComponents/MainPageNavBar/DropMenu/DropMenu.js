/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from "next/image"
import { useState } from "react"
import styles from "./styles.module.css"

const DropMenu = ({ items }) => {
  const [selected, setSelected] = useState(undefined)

  return (
    <div className="" key={items.id}>
      <li
        onClick={() => {
          if (selected == items.subTitle) {
            setSelected(!items.subTitle)
          } else {
            setSelected(items.subTitle)
          }
        }}
        className="xl:mx-20 md:mx-4 flex items-center cursor-pointer w-full">
        {items.subTitle}
        <Image src="/static/icons/arrow.svg" layout="fixed" width="15" height="15" />
      </li>
      <div className={`${styles.menuli}`}>
        {selected == items.subTitle
          ? items.links.map((link, index) => (
              <div
                className={`${styles.customDrop} flex justify-center m-auto w-full py-1 cursor-pointer`}
                key={index}>
                {link.title}
              </div>
            ))
          : null}
      </div>
    </div>
  )
}
export default DropMenu
