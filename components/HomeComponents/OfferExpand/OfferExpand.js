import Image from "next/image"
import React from "react"
import { Flipped } from "react-flip-toolkit"
import useWindowSize from "../../../hooks/useWindowSize"
import styles from "./OfferExpand.module.css"

export const ExpandOffer = ({ turnoff }) => {
  const offersExpand = [
    {
      title: "PRICE ESTIMATION",
      svg: "/static/icons/price.svg",
      desc: `using our precise machine learning models,
      we estimate the current and the future price 
      of your listing. `
    },
    {
      title: "TRADE IN OR INSTANT",
      svg: "/static/icons/trade.svg",
      desc: `you have the option to trade in or sell your property
      whith a single click, and we take care of the rest.
      `
    },
    {
      title: "OFFER MONEY SAVER",
      svg: "/static/icons/home.svg",
      desc: ` Save thousands of dollars in listing and 
      commission fees when you use our services.
      `
    },
    {
      title: "SEAMLESS PROCESS",
      svg: "/static/icons/process.svg",
      desc: `we provide mortgage approvals , concierge service 
      property management, legal council and etc all in 
      one place for your convenience.`
    },
    {
      title: "BUSINESS PARTNER ",
      svg: "/static/icons/business.svg",
      desc: `are your a real estate agent looking to join our firm 
      or have a listing you would like to work on? Join our
      housee agent partnership program.`
    },
    {
      title: "AGENT PARTNER",
      svg: "/static/icons/coworker.svg",
      desc: `promote your services on our platform, we connect 
      home buyers and sellers with you.`
    }
  ]

  const offerItems = offersExpand.splice(0, 4)
  const moreItems = offersExpand.splice(0, 2)
  const size = useWindowSize()

  return (
    <>
      <Flipped scale flipId="square">
        <section className={styles["offer-expand-section"]}>
          {/* title */}
          <div className="w-full">
            <div className="flex w-8/12 m-auto">
              <div className="flex justify-start items-center">
                <span className={styles.title}>
                  <Image
                    src="/static/icons/dots.svg"
                    layout="fixed"
                    width="100"
                    height="30"
                    className={styles["dot-svg"]}
                  />
                  <p>What do we offer? </p>
                </span>
              </div>
            </div>
          </div>

          <div className="flex md:w-full">
            <div className="flex flex-col md:flex-row md:justify-around w-9/12 m-auto">
              <div className="flex flex-col md:w-4/12 w-full flex-wrap md:flex-nowrap">
                <div className="flex flex-col">
                  {moreItems.map((offer, index) => (
                    <div key={index} className="my-5 text-gray-500">
                      <div className={`flex items-center justify-start ${styles["offer-title"]}`}>
                        <Image src={offer.svg} layout="fixed" width="40" height="40" />

                        <p className="m-5">{offer.title}</p>
                      </div>
                      <p className={styles.description}>{offer.desc}</p>
                    </div>
                  ))}
                </div>
                {size > 768 ? (
                  <div className={`flex h-full w-full md:w-1/2 items-end`}>
                    <Image src="/static/icons/girl.svg" layout="fixed" width="300" height="150" />
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col  md:w-4/12 w-full order-2">
                {offerItems.map((offer, index) => (
                  <div key={index} className="text-gray-500 my-5">
                    <div className={`flex items-center justify-start ${styles["offer-title"]}`}>
                      <Image src={offer.svg} layout="fixed" width="40" height="40" />
                      <p className="m-5">{offer.title}</p>
                    </div>
                    <p className={styles.description}>{offer.desc}</p>
                  </div>
                ))}
                <div>
                  <span
                    onClick={() => turnoff()}
                    className={`flex items-center ${styles.readmore}`}
                    tabIndex={-1}
                    onKeyDown={() => turnoff()}
                    role="button">
                    <Image src="/static/icons/back.svg" layout="fixed" width="40" height="40" />

                    <span className="ml-3">read less</span>
                  </span>
                </div>
              </div>
              {size < 768 ? (
                <div className="order-3">
                  <Image src="/static/icons/girl.svg" layout="fixed" width="300" height="150" />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </Flipped>
    </>
  )
}

export default ExpandOffer
