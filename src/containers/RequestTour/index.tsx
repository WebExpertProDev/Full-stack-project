/**
 *
 * RequestTour
 *
 */
import React, { memo, useState } from "react"

import { Container, Row, Col } from "react-bootstrap"

import MainHeader from "@Layouts/MainHeader"

// Pagaes
import showTour from "./layout/pages/showTour"
import Verification from "./layout/pages/verification"
import ChooseDate from "./layout/pages/ChooseDate"
import ChooseCall from "./layout/pages/ChooseCall"
import ChooseDate2 from "./layout/pages/ChooseDate2"

type IPage = {
  id: number
  component: React.FunctionComponent
}

const pages = [
  {
    id: 1,
    component: showTour,
  },
  {
    id: 2,
    component: Verification,
  },
  {
    id: 3,
    component: ChooseDate,
  },
  {
    id: 4,
    component: ChooseCall,
  },
  {
    id: 5,
    component: ChooseDate2,
  },
]

export function RequestTour() {
  const [currentPage, setCurrentPage] = useState<IPage>(pages[0])

  const changePage = pageId => {
    setCurrentPage(pages[pageId])
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

export default memo(RequestTour)
