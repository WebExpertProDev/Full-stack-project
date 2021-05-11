import Link from "next/link"
import styles from "./SimilarHomeList.module.css"
import { cardItems } from "./data"
import HouseCard from "../../ListingComponents/HouseCard/HouseCard"

const SimilarHomesList = () => {
  return (
    <section className="w-full mt-8">
      <div className="lg:p-0 w-9/12 m-auto">
        <div>
          <div lg={12} sm="10">
            <div className={`flex justify-start ${styles.title}`}>
              <div className={styles.circle} />
              <p>Similar homes </p>
            </div>
          </div>
          <div className="flex justify-around w-full">
            {cardItems.map((cardItem, index) => (
              <div key={index} className="mx-4 flex justify-center">
                <Link href="/detail">
                  <HouseCard key={index} cardItem={cardItem} size="lg" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SimilarHomesList
