const router = require('express').Router()
const {Order, orderProduct, User, Product} = require('../db/models')
const {adminOnly, userOnly, sendEmail} = require('./utlis')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allOrders = await Order.findAll()
    res.json(allOrders)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleOrder = await Order.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    await singleOrder.calculate()

    res.json(singleOrder)
  } catch (error) {
    next(error)
  }
})

router.post('/place/:id', async (req, res, next) => {
  try {
    if (
      req.session.cart !== undefined &&
      req.session.cart.products !== undefined
    ) {
      req.session.cart.products = []
    }
    const {user, order} = req.body
    sendEmail({
      from: process.env.GOOGLE_EMAIL_ADDRESS, // sender address
      to: user.email, // list of receivers
      subject: `Thank you for your order`, // Subject line
      // text: `${req.body.user.userName}, thank you for your order`, // plain text body
      html: `<b> Thank you for your order ${user.userName}. Your order ID is ${order.id}.
      Your order will be shipped to ${user.address}. </b>` // html body
    })
    const currentOrder = await Order.findByPk(req.params.id, {
      include: [{model: Product}]
    })

    //updated the product stock
    for (let i = 0; i < currentOrder.products.length; ++i) {
      currentOrder.products[i].stock -=
        currentOrder.products[i].orderproduct.quantity
      if (currentOrder.products[i].stock >= 0) {
        currentOrder.products[i].save()
      } else {
        throw new Error('low inventory')
      }
    }

    await currentOrder.update({
      status: 'placed',
      stripeId: req.body.stripeId
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.post('/:id', async (req, res, next) => {
  try {
    const products = req.session.cart.products

    //creat new order
    const guestOrder = await Order.create({
      status: 'inCart',
      include: [{model: Product}]
    })

    //add the quantity and product into the new order
    for (let i = 0; i < products.length; ++i) {
      const product = await Product.findByPk(products[`${i}`].id)
      await guestOrder.addProduct(product, {
        through: {quantity: products[`${i}`].orderproduct.quantity}
      })
    }

    //find the order include the product  otherwise cant see the product in the page
    const returnOrder = await Order.findByPk(guestOrder.id, {
      include: [{model: Product}]
    })
    //calulate the total
    await returnOrder.calculate()
    res.json(returnOrder)
  } catch (error) {
    next(error)
  }
})
