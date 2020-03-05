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

router.post('/:id', userOnly, async (req, res, next) => {
  try {
    //find the products in the seesion
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
router.post('/checkout', async (req, res, next) => {
  try {
    // just change the status....  stripe has to also fullfilled
    const currentOrder = await Order.findByPk(req.body.id)
    const product = await Product.findAll({where: {name: req.body.productname}})
    await currentOrder.addProduct(product, {
      through: {quantity: req.body.quantity}
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})
