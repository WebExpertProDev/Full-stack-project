import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async event => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    async function stripeTokenHandler(token) {
      const paymentData = { stripeEmail: "123@123.com", stripeToken: token.id };

      // Use fetch to send the token ID and any other payment data to your server.
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      const response = await fetch(
        "http://localhost:5000/api/user/payment/charge",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(paymentData)
        }
      );

      // Return and display the result of the charge.
      // return response.json();
      return response;
    }
    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message);
    } else {
      // Send the token to your server.
      const test = await stripeTokenHandler(result.token);
      console.log(test);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        textAlign: "center"
      }}
    >
      <h1> $20000000</h1>
      <CardSection />
      <button
        disabled={!stripe}
        style={{
          color: "white",
          "background-color": "rgb(87, 201, 221)",
          "border-radius": "10px"
        }}
      >
        Confirm order
      </button>
    </form>
  );
}
