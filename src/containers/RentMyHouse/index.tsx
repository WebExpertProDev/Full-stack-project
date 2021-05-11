/**
 *
 * RentmyHouse
 *
 */
import React, { memo, useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import MainHeader from '@Layouts/MainHeader';

// Pagaes
import RentMyHome from './layout/pages/RentMyHome';
import RentMyHome2 from './layout/pages/RentMyHome2';
import RentMyHome3 from './layout/pages/RentMyHome3';
import ChooseDate from './layout/pages/ChooseDate';
import ChooseFeature from './layout/pages/ChooseFeature';
import NearBy from './layout/pages/NeadrBy';
import OpenHouse from './layout/pages/OpenHouse';
import RentalListing from './layout/pages/RentalListing';
import Media from './layout/pages/Media';

type IPage = {
  id: number;
  component: React.FunctionComponent;
};

const pages = [
  {
    id: 1,
    component: RentMyHome,
  },
  {
    id: 2,
    component: RentMyHome2,
  },
  {
    id: 3,
    component: RentMyHome3,
  },
  {
    id: 4,
    component: ChooseDate,
  },
  {
    id: 5,
    component: ChooseFeature,
  },
  {
    id: 6,
    component: NearBy,
  },
  {
    id: 7,
    component: OpenHouse,
  },
  { id: 8, component: RentalListing },
  { id: 9, component: Media },
];

export function RentmyHouse() {
  const [currentPage, setCurrentPage] = useState<IPage>(pages[0]);

  const changePage = (pageId) => {
    setCurrentPage(pages[pageId]);
  };

  return (
    <div>
      <MainHeader Theme="light" />
      <Container fluid="lg" className="pt-5 mt-5 px-lg-0">
        <Row>
          <Col>
            {/* CurrentPage */}
            <currentPage.component changePageHandler={changePage} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default memo(RentmyHouse);
