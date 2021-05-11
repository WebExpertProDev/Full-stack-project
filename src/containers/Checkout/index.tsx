import { NextPage } from "next";
import React, { memo } from "react";
import MainHeader from "@Layouts/MainHeader";
import MainFooter from "@Layouts/MainFooter";
import CheckoutForm from "../../components/Checkout/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import "./styles.module.css";
import { useRouter } from "next/router";
import InfoCard from "@Components/Checkout/InfoCard";
const stripePromise = loadStripe(
  "pk_test_51IG6MSLvlbaFqlOj6f6JcNKj2k5OrjORqo9a5Hns88hbD0mpBB9m2Sf2sUTvrFdA4Zh9m7BOIoYjr6AVLzyuVjhc00hvevBwBK"
);
export function DonatePage() {
  const router = useRouter();
  console.log(router.query);
  return (
    <>
      <div>
        <MainHeader Theme="light" />

        <div style={{ marginTop: 100 }}>
          <Elements stripe={stripePromise}>
            <InfoCard session_id={router.query.session_id} />
          </Elements>
        </div>

        <MainFooter />
      </div>
    </>
  );
}

export default memo(DonatePage);
