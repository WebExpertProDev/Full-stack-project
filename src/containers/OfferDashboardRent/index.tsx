/**
 *
 * OfferDashboardRent
 *
 */
import React, { memo, useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import MainHeader from '@Layouts/MainHeader';
import DashboardNav from './layout/DashboarNav';

// pages
import Offers from './layout/pages/Offers';
import Contarct from './layout/pages/Contract';
// import OfferModal from './layout/pages/Modal';
// assets
import Path from '../RequestTour/layout/pages/ChooseCall/svg/path.svg';

// Scoped Styles
import styles from './styles/OfferDashboardRent.module.scss';

type Ipage = {
  id: number;
  component: React.FunctionComponent;
  title: string;
};

const page = [
  {
    id: 0,
    component: Contarct,
  },
  {
    id: 1,
    component: Offers,
    title: 'Tenant',
  },

  // {
  //   id: 2,
  //   component: OfferModal,
  //   title: 'Tenant',
  // },
];
export function OfferDashboardRent() {
  const [currentPage, setCurrentPage] = useState<Ipage>(page[0]);
  const changePage = (pageId) => {
    setCurrentPage(pageId);
  };
  return (
    <section>
      <MainHeader Theme="light" />
      <DashboardNav />
      <Container fluid="lg" className="px-lg-0">
        {currentPage.title && (
          <div className="d-flex align-items-center mt-2">
            <Path />
            <h1 className={styles.title}>{currentPage.title}</h1>
          </div>
        )}

        <Row>
          <Col>
            {/* CurrentPage */}
            <currentPage.component changePageHandler={changePage} />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default memo(OfferDashboardRent);
