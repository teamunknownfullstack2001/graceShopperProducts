const router = require('express').Router()
const {Order, OrderItem, User, Product} = require('../db/models')
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
      include: [{model: OrderItem, include: [{model: Product}]}, {model: User}]
    })
    res.json(singleOrder)
  } catch (error) {
    next(error)
  }
})
