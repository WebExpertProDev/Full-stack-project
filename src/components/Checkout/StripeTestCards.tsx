const StripeTestCards = () => {
  return (
    <div className="test-card-notice">
      Use any of the{" "}
      <a
        href="https://stripe.com/docs/testing#cards"
        target="_blank"
        rel="noopener noreferrer"
      >
        Stripe test cards
      </a>{" "}
      for this demo, e.g. 4242<span></span>4242<span></span>4242<span></span>
      4242.
    </div>
  );
};

export default StripeTestCards;
