import Image from "next/image"
import { Flipper, Flipped } from "react-flip-toolkit"
import { useState } from "react"
import ExpandOffer from "../OfferExpand/OfferExpand"
import styles from "./styles.module.css"

const Offer = () => {
  const [active, setActive] = useState(false)
  const offers = [
    {
      title: "PRICE ESTIMATION",
      svg: "/static/icons/price.svg"
    },
    {
      title: "TRADE IN OR INSTANT",
      svg: "/static/icons/trade.svg"
    },
    {
      title: "OFFER MONEY SAVER",
      svg: "/static/icons/home.svg"
    },
    {
      title: "SEAMLESS PROCESS",
      svg: "/static/icons/process.svg"
    }
  ]
  return (
    <>
      <Flipper spring="veryGentle" flipKey={active}>
        {!active ? (
          <Flipped scale flipId="square" className="w-full">
            <section className="mt-9 w-full md:w-8/12 m-auto">
              <div className="my-5">
                <div className="flex w-full">
                  <div className="flex m-auto w-10/12 lg:w-full lg:justify-start justify-start items-center ">
                    <p className={styles.content}>
                      <Image
                        src="/static/icons/dots.svg"
                        layout="fixed"
                        width="100"
                        height="30"
                        className={styles["dot-svg"]}
                      />
                      <span> What do we offer? </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-around w-full">
                <div className="flex flex-col md:flex-row flex-wrap justify-around">
                  <div className="flex justify-start w-full lg:w-1/4 items-end order-last lg:order-first">
                    <Image
                      src="/static/icons/girl.svg"
                      layout="fixed"
                      width="300"
                      height="150"
                      className={styles["girl-svg"]}
                    />
                  </div>

                  <div
                    className={`flex justify-center w-full m-auto lg:w-3/4 ${styles.optionsOffer}`}>
                    <div className="flex flex-wrap m-auto w-full">
                      <div className="flex flex-col lg:flex-row w-9/12 lg:w-10/12 xl:w-9/12 m-auto flex-wrap">
                        {offers.map((i) => (
                          <div
                            key={i.title}
                            className={`flex justify-center mx-5 ${styles["expand-offer-row"]}`}>
                            <div className="flex flex-wrap items-center justify-start">
                              <Image src={i.svg} layout="fixed" width="40" height="40" />
                              <p className="ml-2"> {i.title} </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex w-full justify-end">
                        <span
                          onClick={() => setActive(!active)}
                          onKeyDown={() => setActive(!active)}
                          tabIndex={-1}
                          role="button"
                          className={`flex items-center ${styles.readmore}`}>
                          <span>read more</span>
                          <Image
                            src="/static/icons/next.svg"
                            layout="fixed"
                            width="30"
                            height="20"
                            className="ml-2"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Flipped>
        ) : null}
        {active ? <ExpandOffer turnoff={() => setActive(false)} /> : null}
      </Flipper>
    </>
  )
}

export default Offer
