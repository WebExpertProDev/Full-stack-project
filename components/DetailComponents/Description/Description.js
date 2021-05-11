import Image from "next/image"
import React from "react"
import styles from "./description.module.css"

const Description = () => {
  return (
    <section className={styles["description-section"]}>
      <div className="lg:p-0 w-full">
        <div className="flex justify-around m-auto w-full flex-wrap lg:flex-nowrap lg:w-9/12">
          <div
            className={`flex md:justify-start justify-center items-center  ${styles["feature-left"]}`}>
            <div className="flex items-center">
              <Image
                src="/static/icons/bed.svg"
                layout="fixed"
                width="20"
                height="20"
                className={styles.svgIcon}
              />
              <span className="ml-lg-2 ml-1 ">3beds</span>
            </div>

            <div className="flex items-center">
              <Image src="/static/icons/Seperator.svg" layout="fixed" width="10" height="10" />
              <Image
                src="/static/icons/bath.svg"
                layout="fixed"
                width="20"
                height="20"
                className={`lg:ml-3 ml-1 ${styles.svgIcon}`}
              />
              <span className="lg:ml-2 ml-1">1 Baths</span>
            </div>
            <div className="flex items-center">
              <Image src="/static/icons/Seperator.svg" layout="fixed" width="10" height="10" />
              <Image
                src="/static/icons/home.svg"
                layout="fixed"
                width="20"
                height="20"
                className={`ml-lg-3 ml-1 ${styles.svgIcon}`}
              />
              <span className="lg:ml-2 ml-1">230 sqft</span>
            </div>
          </div>
          <div
            className={`flex lg:justify-end md:justify-end 
            justify-center mt-4 lg:mt-0 md:mt-0 ${styles["feature-right"]}`}>
            <Image src="/static/icons/reload.svg" layout="fixed" width="20" height="20" />
            <span className="ml-1">Date listed: 2 days ago - 3 views</span>
          </div>
        </div>

        <div className="flex justify-center m-auto w-8/12">
          <div className={styles.description}>
            <p>
              Shannon Wall Centre! This luxury Concrete condo offers a perfect modern open layout.
              Floor to ceiling windows offers lots of sunshine into the unit, facing east into the
              gardens ensure privacy. This unit features high end SS appliances, Geothermal heating
              system and engineered hardwood flooring throughout.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Description
