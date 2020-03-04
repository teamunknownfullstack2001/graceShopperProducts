const router = require('express').Router()
const {User, Order, OrderItem, Product} = require('../db/models')

module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const cart = await Order.findAll({
      include: [{model: Product}], //,
      where: {status: 'inCart', userId: +req.params.id}
    })

    res.json(cart)
  } catch (error) {
    next(error)
  }
})
