import React, { useState } from "react";
import Button from "../Button";
import CustomAmountInput from "./CustomAmountInput";
import StripeTestCards from "./StripeTestCards";
import styles from "./styles/styles.module.css";
import getStripe from "./utils/get-stripejs";
import { fetchPostJSON } from "./utils/api-helpers";
import { formatAmountForDisplay } from "./utils/stripe-helpers";
import * as config from "./config";
import { useRouter } from "next/router";
const CheckoutForm = ({ amount, Text }) => {
  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    customAmount: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP)
  });
  const router = useRouter();
  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = e =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
    });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    if (amount == "0") {
      console.log("Free Plan Selected");
      router.push("/");
      return;
    }
    e.preventDefault();
    setLoading(true);
    // Create a Checkout Session.
    const response = await fetchPostJSON(
      "http://localhost:5000/api/user/payment/checkout-session",
      {
        amount: amount
      }
    );

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: response.id
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* <CustomAmountInput
        className={styles.checkoutstyle}
        name={"customAmount"}
        value={input.customAmount}
        min={config.MIN_AMOUNT}
        max={config.MAX_AMOUNT}
        step={config.AMOUNT_STEP}
        currency={config.CURRENCY}
        onChange={handleInputChange}
      />
      <StripeTestCards /> */}
      <Button
        //className={styles.checkoutstylebackground}
        type="submit"
        disabled={loading}
        handleClick={handleSubmit}
      >
        {Text}
      </Button>
    </form>
  );
};

export default CheckoutForm;