const router = require('express').Router()
module.exports = router

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

const stripe = require('stripe')(stripeSecretKey)
router.post('/', async (req, res) => {
  const paymentBody = {
    amount: 1000,
    currency: 'usd',
    metadata: {integration_check: 'accept_a_payment'}
  }
  try {
    const paymentIntent = await stripe.paymentIntents.create(paymentBody)
    console.log('Charge Successful')
    res.json(paymentIntent)
  } catch (error) {
    console.log('Charge Fail')
    res.status(500)
  }
})