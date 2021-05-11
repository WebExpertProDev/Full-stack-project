/**
 *
 * SendAnOffer
 *
 */
import React, { memo, useState } from "react"

import { Container, Row, Col } from "react-bootstrap"

import MainHeader from "@Layouts/MainHeader"

// pages
import NewOffer from "./layout/pages/NewOffer"
import AdditionalInfo from "./layout/pages/AdditionalInfo"
import Vertification from "./layout/pages/verification"
import Employment from "./layout/pages/Employment"
import RentalApp from "./layout/pages/RentalApp"
import offerDate from "./layout/pages/NewOfferDate"

type IPage = {
  id: number
  component: React.FunctionComponent
}

const pages = [
  {
    id: 1,
    component: NewOffer,
  },
  {
    id: 2,
    component: AdditionalInfo,
  },
  {
    id: 3,
    component: Vertification,
  },
  {
    id: 4,
    component: Employment,
  },
  {
    id: 5,
    component: RentalApp,
  },
  {
    id: 6,
    component: offerDate,
  },
]

export function SendAnOffer() {
  const [currentPage, setCurrenPage] = useState<IPage>(pages[0])

  const changePage = pageId => {
    setCurrenPage(pages[pageId])
  }

  return (
    <div>
      <MainHeader Theme="light" />
      <Container fluid="lg" className="mt-5 px-lg-0">
        <Row>
          <Col>
            {/* CurrentPage */}
            <currentPage.component changePageHandler={changePage} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default memo(SendAnOffer)
