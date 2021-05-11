/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
/**
 *
 * MobileFeature
 *
 */
import Image from "next/image"
import React, { useState } from "react"

// InterFaces
import styles from "./MobileFeature.module.css"

export const MobileFeature = () => {
  const [selected, setSelected] = useState(undefined)
  const FeatureList = [
    {
      title: "Single family home",
      svg: "/static/icons/property.svg"
    },
    {
      title: "Year Built:",
      svg: "/static/icons/yearbuilt.svg"
    },
    {
      title: "Pool Features:",
      svg: "/static/icons/pool.svg"
    },
    {
      title: "View of coast, city or hills",
      svg: "/static/icons/view.svg"
    },
    {
      title: "Basement",
      svg: "/static/icons/basement.svg"
    },
    {
      title: "Parking Spaces:",
      svg: "/static/icons/parking.svg"
    }
  ]
  const FirstColumn = FeatureList.slice(0, 3)
  const SecondColumn = FeatureList.slice(3, 6)
  const First = () =>
    FirstColumn.map((list, index) => (
      <div key={index} className="flex items-center">
        <Image src={list.svg} layout="fixed" width="30" height="30" />
        <span>{list.title}</span>
      </div>
    ))

  const Second = () =>
    SecondColumn.map((list, index) => (
      <div key={index} className="flex items-center">
        <Image src={list.svg} layout="fixed" width="30" height="30" />
        <span>{list.title}</span>
      </div>
    ))
  return (
    <section className="w-full">
      <section className={`lg:px-0  ${styles["section-tab"]}`}>
        <div>
          <div className={styles["feature-card"]}>
            <div className={styles["card-header"]}>
              <div
                className="flex justify-start w-10/12 items-center"
                onClick={() => (selected ? setSelected(undefined) : setSelected(true))}>
                Feature
                <div className={selected ? styles["arrow-open"] : styles["arrow-close"]} />
              </div>
            </div>
            {selected ? (
              <div eventKey="1">
                <div className="p-0">
                  <div className="px-0">
                    <div className="flex justify-around items-center flex-wrap">
                      <div className={styles.features}>
                        <First />
                      </div>
                      <div className={styles.features}>
                        <Second />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </section>
  )
}

export default MobileFeature
