// styles
import styles from "./styles/payment.module.css"
import NumberInput from "../../components/NumberInput/NumberInput"

export const PaymentCalculate = () => (
  <section className={`${styles["payment-calculate"]} block `}>
    <div className="p-0">
      <div className="flex items-center">
        <span className={styles.title}>Mortgage amortization:</span>
        <div className={styles["input-number"]}>
          <NumberInput />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full">
        <div
          className={`flex flex-col items-center justify-center mx-auto w-1/2 ${styles["left-custom-tabel"]}`}>
          <div className={`w-full ${styles["table-title"]}`}>Home price</div>
          <div className={`w-full py-2 ${styles["table-price"]}`}>$703400</div>
          <div className={`w-full ${styles.slidertd}`}>
            <input
              type="range"
              className={styles.slider}
              onChange={(e) => {
                const { value } = e.target
                e.target.style.background = `linear-gradient(to right, #00bbd8 0%, #00bbd8 ${value}%, #fff ${value}%, #c7c7c7 0%)`
              }}
            />
          </div>
          <div className={`w-full ${styles["left-tabel"]}`}>
            <div className="flex justify-between">
              <span className={styles.titleTable}>Principal and Interest</span>
              <span className={styles.price}>$1,337</span>
            </div>
            <div className="flex justify-between">
              <span className={styles.titleTable}>Property Taxes</span>
              <span className={styles.price}>$122</span>
            </div>
            <div className="flex justify-between">
              <span className={styles.titleTable}>Monthly Expenses</span>
              <span className={styles.price}>$143</span>
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col items-center justify-cener mx-auto w-1/2 ${styles["right-custom-tabel"]}`}>
          <div className="flex items-center w-full">
            <div className={`${styles["table-title"]}`}>Down payment</div>
            <div className={styles.percantage} />
          </div>

          <div className={`flex items-center w-full justify-between ${styles["table-price"]}`}>
            <div className={`py-2 ${styles.number}`}>$500400</div>
            <div className={`py-2 ${styles.percantage}`}>%60</div>
          </div>

          <div className={`w-full ${styles.slidertd}`}>
            <input
              type="range"
              className={styles.slider}
              onChange={(e) => {
                const { value } = e.target
                e.target.style.background = `linear-gradient(to right, #00bbd8 0%, #00bbd8 ${value}%, #fff ${value}%, #c7c7c7 0%)`
              }}
            />
          </div>
          <div className={`w-full ${styles["left-tabel"]}`}>
            <div className="flex justify-between">
              <span className={styles.titleTable}>Maintenance Fee</span>
              <span className={styles.price}>$356</span>
            </div>
            <div className="flex justify-between">
              <span className={styles.titleTable}>Homeowners Insurance</span>
              <span className={styles.price}>$317</span>
            </div>
            <div className="flex justify-between">
              <span className={styles.titleTable}>Mortgage interest rate</span>
              <span className={styles.price}>12%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className=" ">
          {/* <div className={styles["money-svg"]}>
            <Image src="/static/icons/money.svg" layout="fixed" width="30" height="30" />
          </div> */}
          <div className={styles.fairprice}>
            <span className={styles.icon} />
            <span>Fair Price</span>
          </div>
          <span className={`${styles.total} flex flex-col`}>
            <div className="flex justify-center items-center lg:px-5 px-3">
              <span>Purchase Price: </span>
              <span>$1,749,000</span>
            </div>
            <div className="flex justify-center items-center lg:px-5 px-3">
              <span>Mortgage Amount: </span>
              <span>$386,860</span>
            </div>
            <div className="flex justify-center items-center lg:px-5 px-3 pb-2">
              <span>Total mountly payment: </span>
              <span>$386,860</span>
            </div>
          </span>
        </div>
      </div>
    </div>
  </section>
)

export default PaymentCalculate
