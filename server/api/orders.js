const router = require('express').Router()
const {Order, orderProduct, User, Product} = require('../db/models')
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
    res.json(singleOrder)
  } catch (error) {
    next(error)
  }
})

router.post('/checkout', async (req, res, next) => {
  try {
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
