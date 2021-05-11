/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react"
import { cardLists } from "./data"
import styles from "./detailOccordion.module.css"

export const Occordion = () => {
  const [selected, setSelected] = useState(undefined)

  return (
    <section className="w-full">
      <div className={`lg:px-0 w-9/12 m-auto ${styles["section-tab"]}`}>
        <div>
          {cardLists.map((cardList) => (
            <div className={styles["feature-card"]} key={cardList.id}>
              <div className={styles["card-header"]} key={cardList.id}>
                <div
                  key={cardList.id}
                  className="flex items-center"
                  onClick={() => {
                    if (selected == cardList.cardHeader) {
                      setSelected(!cardList.cardHeader)
                    } else {
                      setSelected(cardList.cardHeader)
                    }
                  }}>
                  {cardList.cardHeader}
                  <div
                    className={
                      selected == cardList.cardHeader ? styles["arrow-open"] : styles["arrow-close"]
                    }
                  />
                </div>
              </div>
              {/* <CardList cardList={cardList} index={index} /> */}
              {selected == cardList.cardHeader ? (
                <div eventKey={`${cardList.id}`} key={cardList.id}>
                  <div style={{ padding: 0 }}>
                    <cardList.cardToggle />
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Occordion
