/**
 *
 * MobileButtons
 *
 */
import React, { useState } from "react";

// InterFaces
import Button from "@Components/Button";
import { IMobileButtons } from "./MobileButtons";

import Path from "./svg/path.svg";
import Starr from "./svg/star.svg";
import Share from "./svg/share.svg";
import Fav from "./svg/fav.svg";
import { useRouter } from "next/router";

export const MobileButtons: React.FunctionComponent<IMobileButtons.IProps> = ({
  detail
}) => {
  const overview = {
    openHouseDate: detail.openHouseDate,
    streetAddress: detail.streetAddress,
    city: detail.city,
    province: detail.province,
    postalCode: detail.postalCode,
    price: detail.historyPrice[detail.historyPrice.length - 1]
  };

  const address =
    overview.city +
    ", " +
    overview.province +
    " " +
    overview.postalCode +
    " - " +
    overview.streetAddress;
  const [copyState, setCopyState] = useState<string>("Copy Share Link");

  const copyLink = () => {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = window.location.href;
    console.log(dummy.value);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    setCopyState("Copied!");
    setTimeout(() => setCopyState("Copy Share Link"), 1000);
  };
  //please separate complete address and street address

  const router = useRouter();
  const BookTour = () => {
    localStorage.setItem("HomeAddress", overview.streetAddress);
    localStorage.setItem("PostalCode", overview.postalCode);
    localStorage.setItem("Provience", overview.province);
    localStorage.setItem("City", overview.city);
    localStorage.setItem("OpenHouseDate", overview.openHouseDate);
    router.push("/request-tour");
    return;
  };
  const SendOffer = () => {
    router.push("/send-an-offer");
    return;
  };
  return (
    <section className="d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex  justify-content-between align-items-center w-100 px-3">
        <div className="w-50 mr-1">
          <Button
            theme="outline-gray"
            size="md"
            height="32px"
            font="12px"
            fontFamily="Regular"
            hasIcon={<Share />}
            handleClick={copyLink}
          >
            {copyState}
          </Button>
        </div>
        <div className="w-50 ml-1">
          <Button
            theme="outline-gray"
            size="md"
            height="32px"
            font="12px"
            fontFamily="Regular"
            hasIcon={<Fav />}
          >
            Add to Favorites
          </Button>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center w-100 px-3 mt-4 mb-4">
        <div className="w-50 mr-2">
          <Button theme="primary" font="15px" handleClick={BookTour}>
            Schedule a Tour
          </Button>
        </div>
        <div className="w-50 ml-2">
          <Button theme="outline" font="15px" handleClick={SendOffer}>
            Send an Offer
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MobileButtons;
