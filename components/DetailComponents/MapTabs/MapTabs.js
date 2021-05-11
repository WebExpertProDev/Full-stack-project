import React from "react"
import { TabContent, TabLink, Tabs } from "react-tabs-redux"
import styles from "./Detailtabs.module.css"
import Map from "../../ListingComponents/Map/Map"

export const MapTabs = () => {
  return (
    <div className="lg:p-0 w-full flex justify-center m-auto">
      <div className="w-9/12">
        <div className={styles["tab-container"]}>
          <Tabs className={styles.tab} id="controlled-tab-example">
            <div className="w-full flex justify-center border-b-2">
              <TabLink to="tab1" className="mx-2 w-2/12">
                Direction
              </TabLink>
              <TabLink to="tab2" className="mx-auto w-2/12 border-r-2">
                Street views
              </TabLink>
              <TabLink to="tab3" className="mx-2 w-8/12 border-r-2">
                Location
              </TabLink>
            </div>
            <TabContent for="tab1">
              <div style={{ height: "250px", width: "100%" }} className={styles.map}>
                <Map />
              </div>
            </TabContent>
            <TabContent for="tab2">
              <div
                style={{ height: "250px", width: "100%" }}
                className="flex justify-center items-center">
                Street views
              </div>
            </TabContent>
            <TabContent for="tab3">
              <div></div>
            </TabContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default MapTabs
