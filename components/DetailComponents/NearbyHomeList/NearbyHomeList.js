import Link from "next/link"
import React from "react"
import HouseCard from "../../ListingComponents/HouseCard/HouseCard"
import { cardItems } from "../SimilarHomesList/data"

import styles from "./NearbyHomeList.module.css"

export const NearbyHomeList = () => {
  return (
    <section className="mt-8 w-full">
      <div className="lg:p-0 w-9/12 m-auto">
        <div>
          <div>
            <div className={styles.title}>
              <div className={styles.circle} />
              <p>Nearby homes</p>
            </div>
          </div>
          <div className="flex justify-around">
            {cardItems.map((cardItem, index) => (
              <div key={index} className=" mx-4 lg:mt-0 flex justify-content-center">
                <Link href="/detail">
                  <HouseCard key={index} cardItem={cardItem} size="lg" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
