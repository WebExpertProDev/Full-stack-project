import { useState } from "react"
import Button from "../../../../Button/Button"

import styles from "./styles/PastListing.module.css"

export const PastListing = () => {
  const [active, setActive] = useState("buy")
  return (
    <section className={styles.listing}>
      <div className="">
        <div className="flex">
          <div className="flex w-full lg:justify-end justify-center ">
            <div className={`flex ${styles["group-btn"]}`}>
              <div className={`w-1/2 ${active === "2018" ? styles.rentBtnActive : styles.rentBtn}`}>
                <Button theme="outline-gray">2018</Button>
              </div>
              <div className={`w-1/4 ${active === "rent" ? styles.rentBtnActive : styles.rentBtn}`}>
                <Button handleClick={() => setActive("rent")} theme="outline-gray">
                  rent
                </Button>
              </div>
              <div className={`w-1/4 ${active === "buy" ? styles.buyBtnActive : styles.buyBtn}`}>
                <Button theme="outline-gray" handleClick={() => setActive("buy")}>
                  buy
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-around">
          <div className={`text-center w-full mt-2 ${styles.first}`}>
            <p>Date</p>

            <div className="flex flex-col items-center py-4">
              <span className="pb-3">May 2018</span>
              <span>May 2018</span>
            </div>
          </div>
          <div className={`text-center w-full mt-2 ${styles.first}`}>
            <p>Unit address</p>

            <div className="flex flex-col items-center py-4">
              <span className="pb-3">May 2018</span>
              <span>May 2018</span>
            </div>
          </div>
          <div className={`text-center w-full  mt-2 ${styles.first}`}>
            <p>Price</p>

            <div className="flex flex-col items-center py-4">
              <span className="pb-3">May 2018</span>
              <span>May 2018</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PastListing
