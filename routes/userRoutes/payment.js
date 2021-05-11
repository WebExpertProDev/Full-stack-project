const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_API_KEY);

router.post('/charge', (req, res, next) => {
  const amount = 20000000;
  const { stripeEmail, stripeToken } = req.body;
  
  stripe.customers.create({
    email: stripeEmail,
    source: stripeToken,
  })
  .then(
    function (customer) { stripe.charges.create({
      amount,
      description: 'housee payment',
      currency: 'CAD',
      customer: customer.id,
    })},
    // ! Error handling
    function (error) {
      switch (error.type) {
        case 'StripeCardError':
          // A declined card error
          res.status(400).send({error: error.message, type: error.type});
          // err.message; // => e.g. "Your card's expiration year is invalid."
          break;
        case 'StripeInvalidRequestError':
          // Invalid parameters were supplied to Stripe's API
          res.status(400).send({error: error.message, type: error.type});
          break;
        case 'StripeAPIError':
          // An error occurred internally with Stripe's API
          res.status(400).send({error: error.message, type: error.type});
          break;
        case 'StripeConnectionError':
          // Some kind of error occurred during the HTTPS communication
          res.status(400).send({error: error.message, type: error.type});
          break;
        case 'StripeAuthenticationError':
          // You probably used an incorrect API key
          res.status(400).send({error: error.message, type: error.type});
          break;
        case 'StripeRateLimitError':
          // Too many requests hit the API too quickly
          res.status(400).send({error: error.message, type: error.type});
          break;
        case 'StripePermissionError':
          // Access to a resource is not allowed
          res.status(400).send({error: error.message, type: error.type});
          break;
        case 'StripeIdempotencyError':
          // An idempotency key was used improperly
          res.status(400).send({error: error.message, type: error.type});
          break;
        case 'StripeInvalidGrantError':
          // InvalidGrantError is raised when a specified code doesn't exist, is
          // expired, has been used, or doesn't belong to you; a refresh token doesn't
          // exist, or doesn't belong to you; or if an API key's mode (live or test)
          // doesn't match the mode of a code or refresh token.
          res.status(400).send({error: error.message, type: error.type});
          break;
      }
    }
  )
  .then(charge => res.status(200).send(charge))
  .catch(error => res.status(503).send(error.message));
})

module.exports = router