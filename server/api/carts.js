const router = require('express').Router()
const {User, Order, OrderProduct, Product} = require('../db/models')

module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const [cart, created] = await Order.findOrCreate({
      include: [{model: Product, through: {attributes: ['quantity']}}], //,
      where: {status: 'inCart', userId: +req.params.id}
    })
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

Order.prototype.addrOrIncrementProduct = async function(ProductId) {
  const product = await Product.findByPk(ProductId)
  if (!(await this.hasProduct(product))) {
    this.addProduct(product, {through: {quantity: 1}})
  } else {
    const quantity = await this.getProduct(product) //i should find the instance in orderProduct
    console.log('assocation already exists!!!!!!!!!how do i increment quatity')

    this.addProduct(product, {through: {quantity: 10}})
  }
}

router.post('/:id', async (req, res, next) => {
  try {
    const [cart, created] = await Order.findOrCreate({
      include: [{model: Product}], //,
      where: {status: 'inCart', userId: +req.params.id}
    })
    await cart.addrOrIncrementProduct(+req.body.id)

    res.json(cart)
  } catch (error) {
    next(error)
  }
})
