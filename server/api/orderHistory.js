const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router

router.get(':id', async (req, res, next) => {
  try {
    const orderHistory = await Order.findAll({
      include: [{model: Product, through: {attributes: ['name', 'quantity']}}],
      where: {status: 'placed', userId: +req.params.id}
    })
    res.json(orderHistory)
  } catch (error) {
    next(error)
  }
})
