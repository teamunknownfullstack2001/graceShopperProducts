const router = require('express').Router()
const {Order, orderProduct, User, Product} = require('../db/models')
const {adminOnly, userOnly} = require('./utlis')
module.exports = router

router.get('/', userOnly, async (req, res, next) => {
  try {
    const allOrders = await Order.findAll()
    res.json(allOrders)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', userOnly, async (req, res, next) => {
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
    console.log(req.body)
    const currentOrder = await Order.findByPk(req.params.id)
    await currentOrder.update({
      status: 'placed',
      stripeId: req.body.stripeId
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

router.post('/:id', userOnly, async (req, res, next) => {
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
