const router = require('express').Router()
const {adminOnly, userOnly} = require('./utlis')
module.exports = router

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

const stripe = require('stripe')(stripeSecretKey)
router.post('/', async (req, res, next) => {
  // console.log(paymentBody)
  console.log(req.body)
  try {
    // const paymentIntent = await stripe.paymentIntents.create(paymentBody)
    const paymentIntent = await stripe.paymentIntents.create(req.body)
    console.log('Charge Successful')
    res.json(paymentIntent)
  } catch (error) {
    console.log('Charge Fail')
    res.status(500)
  }
})
