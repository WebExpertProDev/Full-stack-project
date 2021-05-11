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
import { IRequestTour } from "./RequestTour"
import { has } from "immer/dist/internal"

type IPage = {
  id: number
  component: React.FunctionComponent
}

const pages = [
  {
    id: 1,
    component: ChooseDate,
  },
  {
    id: 2,
    component: ChooseDate2,
  },
  {
    id: 3,
    component: ChooseCall,
  },
  {
    id: 4,
    component: Verification,
  },
  {
    id: 5,
    component: showTour,
  },
]

export const RequestTour: React.FunctionComponent<IRequestTour.IProps> = () => {
  const [currentPage, setCurrentPage] = useState<IPage>(pages[0])
  const [currDate, setDate] = useState<Date>(new Date())
  //scheduled date
  const [app, setApp] = useState<string>("")
  //video chat app type
  const [endDate, setEndDate] = useState<string>("")
  const [startDate, setStartDate] = useState<string>("")
  //open house dates
  const [hasAgent, setHasAgent] = useState<boolean>(false)
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
            <currentPage.component changePageHandler={changePage} currentDate={currDate} setCurrentDate={setDate} 
            appType={app} setappType={setApp} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} agentInfo={hasAgent} setAgent={setHasAgent}/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default RequestTour;
