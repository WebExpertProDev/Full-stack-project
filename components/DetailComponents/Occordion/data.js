import PymentCaluculate from "./layouts/PaymentCalculate/index"
import Historical from "./layouts/Historical/index"
import Offers from "./layouts/Offers/index"
import PastListing from "./layouts/PastListing/index"

export const cardLists = [
  {
    id: 1,
    cardHeader: "Payment Calculator",
    cardToggle: PymentCaluculate
  },
  {
    id: 2,
    cardHeader: "Historical Avg.Prices of South park",
    cardToggle: Historical
  },
  {
    id: 3,
    cardHeader: "Offers",
    cardToggle: Offers
  },
  {
    id: 4,
    cardHeader: "Past listings",
    cardToggle: PastListing
  }
]
