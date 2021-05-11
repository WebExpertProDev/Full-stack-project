import React, { useState } from "react"

// styles
import styles from "./styles/Historical.module.css"
import Button from "../../../../Button/Button"
import CustomLineChart from "./CustomLineChart"

// components
export const Historical = () => {
  const [active, setActive] = useState("buy")

  return (
    <section className={styles.historical}>
      <div fluid="lg" className="">
        <div>
          <div className="flex flex-col items-center justify-center lg:flex-row flex-wrap">
            <div className={`${styles.tree} flex justify-around`}>
              <CustomLineChart responsiveSize={[280, 500, 650, 600, 700]} />
            </div>
            <div className="flex flex-col justify-between items-center mx-5 mb-4">
              <div className={`flex w-full h-auto ${styles["group-btn"]}`}>
                <div
                  className={`w-1/2 ${active == "rent" ? styles.rentBtnActive : styles.rentBtn}`}>
                  <Button handleClick={() => setActive("rent")} theme="outline-gray">
                    rent
                  </Button>
                </div>
                <div className={`w-1/2 ${active == "buy" ? styles.buyBtnActive : styles.buyBtn}`}>
                  <Button theme="outline-gray" handleClick={() => setActive("buy")}>
                    buy
                  </Button>
                </div>
              </div>

              <ul className={styles["historical-list"]}>
                <li>
                  <span className="flex items-center">
                    <div className={styles.liststyle} />
                    <p className="m-0 pl-1">Aquarius at Waterpark City Avg. Price</p>
                  </span>

                  <p className="m-0 pl-3">(29 Sales)</p>
                </li>
                <li>
                  <span className="flex items-center">
                    <div className={styles.liststyle} />
                    <p className="m-0 pl-1">Fork York Avg.Price (518 Sales)</p>
                  </span>
                </li>
              </ul>

              <div className="flex items-center justify-around mb-1">
                <div className="flex flex-col items-center mr-4">
                  <span className={styles.price}>$2.78 /sqft</span>
                  <div className={styles.percentage}> 6.45%</div>
                </div>
                <div className="flex flex-col items-center ml-4">
                  <span className={styles.price}>$8.65 /sqft</span>
                  <div className={styles.percentage}>4.76%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Historical
