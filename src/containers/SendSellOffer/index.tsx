/**
 *
 * SendAnOffer
 *
 */
import React, { memo, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Container, Row, Col } from "react-bootstrap";

import MainHeader from "@Layouts/MainHeader";

// pages
import NewOffer from "./layout/pages/NewOffer";
import Vertification from "./layout/pages/verification";
import SellApp from "./layout/pages/SellApp";
import Confirmation from "./layout/pages/Confirmation";

type IPage = {
  id: number;
  component: React.FunctionComponent;
};

const pages = [
  {
    id: 0,
    component: NewOffer
  },
  {
    id: 1,
    component: Vertification
  },
  {
    id: 2,
    component: SellApp
  },
  {
    id: 3,
    component: Confirmation
  }
];

export function SendSellOffer() {
  const [currentPage, setCurrenPage] = useState<IPage>(pages[0]);
  const changePage = pageId => {
    setCurrenPage(pages[pageId]);
  };

  const curHouse = JSON.parse(window.localStorage.getItem("detail"));
  console.log(curHouse.province);
  const [price, setPrice] = useState<number>(
    parseInt(curHouse.historyPrice[curHouse.historyPrice.length - 1])
  );
  const [files, setFiles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (curHouse === undefined || curHouse === null) {
      router.push("/500");
    }
  }, []);

  return (
    <div>
      <MainHeader Theme="light" />
      <Container fluid="lg" className="mt-5 px-lg-0">
        <Row>
          <Col>
            {/* CurrentPage */}
            <currentPage.component
              changePageHandler={changePage}
              curHouse={curHouse}
              offerPrice={price}
              setPrice={setPrice}
              files={files}
              setFiles={setFiles}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default memo(SendSellOffer);
