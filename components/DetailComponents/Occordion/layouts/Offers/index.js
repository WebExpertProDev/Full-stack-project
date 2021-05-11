import React from "react"
import CustomLineChart from "../Historical/CustomLineChart"

import styles from "./styles/Offers.module.css"

export const Offers = () => (
  <section className={styles.offer}>
    <div className=" w-full">
      <div className="flex">
        <div>
          <div className={styles.tree}>
            <CustomLineChart responsiveSize={[280, 500, 650, 600, 600]} />
          </div>
        </div>
        <div className="flex flex-col justify-end  m-10">
          <div>
            <p>Housee Intelligence insight: 2500$ to 3000$</p>
            <p>Market price: XXX</p>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default Offers
