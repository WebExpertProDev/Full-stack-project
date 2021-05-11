/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from "next/image"
import { useState } from "react"
import styles from "./styles.module.css"

export const WhyFeatures = () => {
  const [active, setActive] = useState(false)
  const items = [
    {
      title: "PRECISE ESTIMATION",
      svg: "/static/precise.png",
      desc: `Estimate current and future listing
      value with the help of proprietary
      ensemble of machine learning and
      artificial intelligence`
    },
    {
      title: "TIME SAVER",
      svg: "/static/time.png",
      desc: `Save time, energy and resources
      by using our services
      `
    },
    {
      title: "AUTOMATED TRANSACTION",
      svg: "/static/automated.png",
      desc: `Buy your favorite listing by
      just click of a button
      `
    },
    {
      title: "TRADE IN ENABLED PLATFORM",
      svg: "/static/trade-enabled.png",
      desc: `Sell your listing to us and focus on
      what matters to you the most, we
      take care of everything A platform
      for selling or buying property online
      `
    },
    {
      title: "MONEY SAVER",
      svg: "/static/money save.svg",
      desc: `Don’t pay humongous
      commission fees anymore
      `
    },
    {
      title: "TAILORED SEARCH QUERY",
      svg: "/static/TAILORED SEARCH.svg",
      desc: `Get search query based on
      your desires, interests and 
     search history
      `
    }
  ]
  return (
    <div className="w-full">
      <div className="flex w-full my-5 lg:m-o ml-auto md:ml-20 ">
        <div className="flex justify-center md:justify-start items-center m-auto md:w-9/12 flex-wrap">
          <div className="w-5 h-5 bg-gray-300 rounded-full " />
          <p className="ml-2 text-xl">WHY HOUSEE?</p>
          <p className="mx-2 text-gray-500">HOUSE is an advanced real estate brokerage platform.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:flex-wrap justify-between w-8/12 m-auto h-auto">
        {items.map((item) => (
          <div key={item.title} className="m-auto w-4/6 md:w-2/6">
            <div className="text-center mt-3">
              <div className="m-5">
                <Image src={item.svg} layout="fixed" width="53" height="53" />
                <p>{item.title}</p>
              </div>

              {active ? <p className={`${styles.desc} py-3 px-7 w-full`}>{item.desc}</p> : ""}
            </div>
          </div>
        ))}
      </div>

      <div
        className={`flex items-center md:justify-end w-full ${styles.readmore} `}
        onClick={() => setActive(!active)}>
        <div className="flex justify-end items-center w-9/12 m-auto">
          {active ? (
            <Image
              src="/static/icons/back.svg"
              layout="fixed"
              width="30"
              height="20"
              className="mr-2"
            />
          ) : (
            ""
          )}
          {active ? <span>read less</span> : <span>read more</span>}
          {!active ? (
            <Image
              src="/static/icons/next.svg"
              layout="fixed"
              width="30"
              height="20"
              className=""
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  )
}

export default WhyFeatures
