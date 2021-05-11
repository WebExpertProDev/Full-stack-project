// import { CSSTransitionGroup } from "react-transition-group"
import styles from "./HouseCard.module.css"
import Link from "next/link"
import HouseCard from "../HouseCard/HouseCard"

export const HouseCardList = ({ cartLayout, cardItems }) => {
  return (
    <>
      <div className={`flex ${cartLayout ? styles.housecardRowMap : styles.housecardRow}`}>
        {cardItems.map((cardItem, index) => (
          <>
            <Link href={`/detail/${cardItem.id}`}>
              <div
                key={cardItem.id}
                className={
                  cartLayout
                    ? `${styles.housecard} md:flex-row flex-col`
                    : `${styles.houseCardMobile}`
                }>
                <HouseCard key={index} cardItem={cardItem} size="lg" />
              </div>
            </Link>
          </>
        ))}
      </div>
    </>
  )
}

export default HouseCardList
