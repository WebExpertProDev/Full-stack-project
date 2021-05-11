const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_API_KEY)
const Analytics = require('analytics-node')
const analytics = new Analytics(process.env.API_KEY_SEGMENT)
router.post('/checkout-session', async (req, res, next) => {
  const {amount} = req.body
  try {
  const params = {
        payment_method_types: ['card'],
        line_items: [
          {
            name: 'housee payment',
            amount: amount,
            currency: "CAD",
            quantity: 1,
          },
        ],
        success_url: `http://localhost:3000/`,
        cancel_url: `http://localhost:3000/`,
  }
  const checkoutSession = await stripe.checkout.sessions.create(
    params
  )
  analytics.identify({
    anonymousId: checkoutSession.id,
    timestamp: new Date()
  })
  analytics.track({
    anonymousId: checkoutSession.id,
    event: 'Purchased was made'
  })
  res.status(200).json(checkoutSession)
  } catch (err) {
  res.status(500).json({ statusCode: 500, message: err.message})
  }

})

module.exports = router
