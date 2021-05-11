import Image from "next/image"
import { useState } from "react"
import { TabContent, TabLink, Tabs } from "react-tabs-redux"
import styles from "./Feature.module.css"

const Feature = () => {
  const [MoreFeature, setMoreFeature] = useState(false)
  return (
    <div className="flex w-full justify-center">
      <div className="mx-5 w-4/12">
        <div className={styles.feature}>
          <span className={styles.title}>Features</span>
          <ul className={styles.details}>
            <li>
              <div className="d-flex align-items-center">
                <Image
                  src="/static/icons/property.svg"
                  className="z-30"
                  layout="fixed"
                  width="30"
                  height="30"
                />
                <span className="ml-2">Property Type:</span>
              </div>
            </li>

            <li>
              <div className="d-flex align-items-center">
                <Image
                  src="/static/icons/yearbuilt.svg"
                  className="z-30"
                  layout="fixed"
                  width="30"
                  height="30"
                />
                <span className="ml-2">Year Built:</span>
              </div>
            </li>

            <li>
              <div className="d-flex align-items-center">
                <Image
                  src="/static/icons/pool.svg"
                  className="z-30"
                  layout="fixed"
                  width="30"
                  height="30"
                />
                <span className="ml-2">Pool Features:</span>
              </div>
            </li>

            <li>
              <div className="d-flex align-items-center">
                <Image
                  src="/static/icons/parking.svg"
                  className="z-30"
                  layout="fixed"
                  width="30"
                  height="30"
                />
                <span className="ml-2">Parking Spaces:</span>
              </div>
            </li>

            <li>
              <div className="d-flex align-items-center">
                <Image
                  src="/static/icons/view.svg"
                  className="z-30"
                  layout="fixed"
                  width="30"
                  height="30"
                />
                <span className="ml-2">View of coast, city or hills</span>
              </div>
            </li>
            {MoreFeature && (
              <>
                <li>
                  <div className="d-flex align-items-center">
                    <Image
                      src="/static/icons/basement.svg"
                      className="z-30"
                      layout="fixed"
                      width="30"
                      height="30"
                    />
                    <span className="ml-2">Basement</span>
                  </div>
                </li>

                <li>
                  <div className="d-flex align-items-center">
                    <Image
                      src="/static/icons/basement.svg"
                      className="z-30"
                      layout="fixed"
                      width="30"
                      height="30"
                    />
                    <span className="ml-2">Basement</span>
                  </div>
                </li>
                <li>
                  <div className="d-flex align-items-center">
                    <Image
                      src="/static/icons/basement.svg"
                      className="z-30"
                      layout="fixed"
                      width="30"
                      height="30"
                    />
                    <span className="ml-2">Basement</span>
                  </div>
                </li>
              </>
            )}
          </ul>

          <div
            role="button"
            tabIndex={-1}
            onKeyDown={() => {
              setMoreFeature(!MoreFeature)
            }}
            onClick={() => {
              setMoreFeature(!MoreFeature)
            }}
            className={`flex items-center  ${styles.readmore}`}>
            {MoreFeature ? (
              <>
                <Image
                  src="/static/icons/back.svg"
                  className="z-30"
                  layout="fixed"
                  width="30"
                  height="30"
                />
                <span className="ml-2">read less</span>
              </>
            ) : (
              <>
                <span className="mr-2">read more</span>

                <Image
                  src="/static/icons/next.svg"
                  className="z-30 ml-2"
                  layout="fixed"
                  width="30"
                  height="30"
                />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mx-5 w-4/12">
        <div className="mt-5 lg:mt-0 md:mt-0">
          <div className={styles.nearby}>
            <span className="text-gray-600 text-xl">Nearby</span>
            <Tabs id="controlled-tab-example" className="mt-5">
              <div className="flex w-full justify-around flex-wrap h-auto text-gray-500">
                <TabLink to="tab1" className="mx-2">
                  School
                </TabLink>
                <TabLink to="tab2" className="mx-2">
                  Bank
                </TabLink>
                <TabLink to="tab3" className="mx-2">
                  Foodservice
                </TabLink>
                <TabLink to="tab4" className="mx-2">
                  Parks
                </TabLink>
                <TabLink to="tab5" className="mx-2">
                  Stores
                </TabLink>
                <TabLink to="tab6" className="mx-2">
                  Other
                </TabLink>
              </div>

              <TabContent for="tab1">
                <div className={styles["nearby-row"]}>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                </div>
                <div className={styles["nearby-row"]}>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                </div>
              </TabContent>
              <TabContent for="tab2">
                <div className={styles["nearby-row"]}>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                </div>

                <div className={styles["nearby-row"]}>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                </div>
              </TabContent>
              <TabContent for="tab3">
                {" "}
                <div className={styles["nearby-row"]}>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                </div>
                <div className={styles["nearby-row"]}>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                </div>
              </TabContent>
              <TabContent for="tab4">
                {" "}
                <div className={styles["nearby-row"]}>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                </div>
                <div className={styles["nearby-row"]}>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                </div>
              </TabContent>
              <TabContent for="tab5">
                {" "}
                <div className={styles["nearby-row"]}>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                </div>
                <div className={styles["nearby-row"]}>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                </div>
              </TabContent>
              <TabContent for="tab6">
                {" "}
                <div className={styles["nearby-row"]}>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                </div>
                <div className={styles["nearby-row"]}>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                  <div className={styles["nearby-tab"]}>
                    <div className={styles.top}>
                      <span className={styles.left}>5</span>
                      <span className={styles.right}>B+</span>
                    </div>
                    <span className={styles.bottom}>Castle Heights Elementary School</span>
                  </div>
                </div>
              </TabContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feature
