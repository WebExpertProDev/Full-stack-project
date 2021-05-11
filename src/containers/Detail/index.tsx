/**
 *
 * Detail
 *
 */
import React, { memo } from "react";
// import MediaQuery from 'react-responsive';
import { useRouter } from "next/router";

// layouts
import MainHeader from "@Layouts/MainHeader";
import MainFooter from "@Layouts/MainFooter";
import useWindowSize from "@Services/hooks/useWindowSize";
import DetailList from "./layouts/DetailList";
import Overview from "./layouts/Overview";
import Description from "./layouts/Description";
import Feature from "./layouts/Feature";
import Occordion from "./layouts/DetailOccordion";
import Tabs from "./layouts/Detailtabs";
import SimilarHomeList from "./layouts/SimilarHomesList";
import NearbyHomeList from "./layouts/NearbyHomesList";
import Slider from "./layouts/Slider";
import MobileFeature from "./layouts/MobileFeature";
import MobileButtons from "./layouts/MobileButtons";
import { request } from "https";



export default function Detail(props) {
  const size = useWindowSize();

  return (
    <>
      <MainHeader Theme="light" />

      {size > 600 ? <DetailList /> : null}

      <Overview />
      <Slider />
      <Description />

      {size > 600 ? <Feature /> : <MobileFeature />}

      {size < 600 ? <MobileButtons /> : null}

      <Tabs />
      <Occordion />
      <SimilarHomeList />
      <NearbyHomeList />
      <MainFooter />
    </>
  );
}
