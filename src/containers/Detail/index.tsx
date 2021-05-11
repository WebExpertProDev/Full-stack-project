/**
 *
 * Detail
 *
 */
import React, { memo, useEffect } from "react";
// import MediaQuery from 'react-responsive';
import { useRouter } from "next/router";

// layouts
import Map from "@Components/Map";
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

export default function Detail(props) {
  console.log(props);
  const router = useRouter();

  if (props.status == 500) {
    return <h1>500 - Internal Server Error</h1>;
  } else if (props.status == 404) {
    return <h1>404 - Page Not Found</h1>;
  }

  const size = useWindowSize();
  const { detail, similarHomes, nearbyHomes } = props;
  useEffect(() => {
    console.log(detail);
  }, []);
  return (
    <>
      <MainHeader Theme="light" />

      {size > 600 ? <DetailList /> : null}

      <Overview detail={detail} />
      <Slider detail={detail} />
      <Description detail={detail} />

      {size > 600 ? <Feature detail={detail} /> : <MobileFeature />}

      {size < 600 ? <MobileButtons detail={detail} /> : null}

      <Tabs item={detail} />
      <Occordion detail={detail} />
      <SimilarHomeList similarHomes={similarHomes} />
      <NearbyHomeList nearbyHomes={nearbyHomes} />
      <MainFooter />
    </>
  );
}
