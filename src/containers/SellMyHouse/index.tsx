/**
 *
 * SellMyHouse
 *
 */
import React, { memo, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";

import MainHeader from "@Layouts/MainHeader";

// pages
import RentMyHome from "./layout/pages/RentMyHome";
import RentMyHome2 from "./layout/pages/RentMyHome2";
import RentMyHome3 from "./layout/pages/RentMyHome3";
import ChooseDate from "./layout/pages/ChooseDate";
import ChooseFeature from "./layout/pages/ChooseFeature";
import NearBy from "./layout/pages/NeadrBy";
import OpenHouse from "./layout/pages/OpenHouse";
import Media from "./layout/pages/Media";
import SellPremium from "./layout/pages/SellPremium";
import SellPrice from "./layout/pages/SellPrice";
type IPage = {
  id: number;
  component: React.FunctionComponent;
};
type Home = {
  forRent: boolean;
  views: string;
  description: string;
  historyPrice: Array<string>;
  image: Array<string>;
  isAvailable: boolean;
  dateListed: string;
  agentID: Array<string>;
  availabilityDate: {
    start: string;
    end: string;
  };
  rentPerTime: string;
  hasAI: boolean;
  hasAIAndAgent: boolean;
  streetAddress: string;
  city: string;
  province: string;
  postalCode: string;
  latAndLong: {
    lat: string;
    Long: string;
  };
  openHouseDate: {
    start: string;
    end: string;
  };
  overview: {
    propertyType: string;
    yearBuilt: string;
    size: string;
    bedroomCount: string;
    bathroomCount: string;
    parkingCount: string;
  };
  propertyFeatures: {
    swimmingPool: boolean;
    elevator: boolean;
    petFriendly: boolean;
    parking: boolean;
    airConditioning: boolean;
    balcony: boolean;
    bbq: boolean;
    ensuitLandry: boolean;
    furnished: boolean;
    bicycleParking: boolean;
    securitySystem: boolean;
    reconstructed: boolean;
    gym: boolean;
    hardwoodFloors: boolean;
    garden: boolean;
    more: string;
  };
  utilities: {
    hydro: boolean;
    heat: boolean;
    gas: boolean;
    electricity: boolean;
    tvOrCable: boolean;
  };
  nearby: {
    School: Array<string>;
    Bank: Array<string>;
    Foodservice: Array<string>;
    Parks: Array<string>;
    Stores: Array<string>;
    Others: Array<string>;
  };
  securityDeposit: string;
  mlsNumber: string;
  isMLSListed: boolean;
};

const pages = [
  {
    id: 1,
    component: RentMyHome
    // component: RentalListing
    // component: Media
  },
  {
    id: 2,
    component: RentMyHome2
  },
  {
    id: 3,
    component: RentMyHome3
  },
  {
    id: 4,
    component: ChooseDate
  },
  {
    id: 5,
    component: ChooseFeature
  },
  {
    id: 6,
    component: NearBy
  },
  {
    id: 7,
    component: OpenHouse
  },
  { id: 8, component: SellPrice },
  { id: 9, component: Media }, //upload list info at this page
  { id: 10, component: SellPremium }
];

export function SellMyHouse() {
  const [currentPage, setCurrentPage] = useState<IPage>(pages[0]);
  const [homeInfo, setHomeInfo] = useState<Home>({
    forRent: false,
    views: "0",
    description: "",
    historyPrice: [],
    image: [],
    isAvailable: true,
    dateListed: new Date().toString(),
    agentID: [],
    availabilityDate: {
      start: new Date().toString(),
      end: ""
    },
    rentPerTime: "Yearly",
    hasAI: true,
    hasAIAndAgent: false,
    streetAddress: "",
    city: "",
    province: "",
    postalCode: "",
    latAndLong: {
      lat: "0",
      Long: "0"
    },
    openHouseDate: {
      start: new Date().toString(),
      end: ""
    },
    overview: {
      propertyType: "House",
      yearBuilt: "unknown",
      size: "30",
      bedroomCount: "1",
      bathroomCount: "1",
      parkingCount: "1"
    },
    propertyFeatures: {
      swimmingPool: false,
      elevator: false,
      petFriendly: false,
      parking: false,
      airConditioning: false,
      balcony: false,
      bbq: false,
      ensuitLandry: false,
      furnished: false,
      bicycleParking: false,
      securitySystem: false,
      reconstructed: false,
      gym: false,
      hardwoodFloors: false,
      garden: false,
      more: ""
    },
    utilities: {
      hydro: false,
      heat: false,
      gas: false,
      electricity: false,
      tvOrCable: false
    },
    nearby: {
      School: [],
      Bank: [],
      Foodservice: [],
      Parks: [],
      Stores: [],
      Others: []
    },
    securityDeposit: "0",
    mlsNumber: "",
    isMLSListed: false
  });

  const changePage = pageId => {
    setCurrentPage(pages[pageId]);
  };

  return (
    <div>
      <MainHeader Theme="light" />
      <Container fluid="lg" className="pt-5 mt-5 px-lg-0">
        <Row>
          <Col>
            {/* CurrentPage */}
            <currentPage.component
              changePageHandler={changePage}
              homeInfo={homeInfo}
              setHomeInfo={setHomeInfo}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default memo(SellMyHouse);
