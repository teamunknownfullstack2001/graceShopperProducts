const router = require('express').Router()
const {User, Order, OrderItem, Product} = require('../db/models')

module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const [cart, created] = await Order.findOrCreate({
      include: [{model: Product, through: {attributes: ['quantity']}}], //,
      where: {status: 'inCart', userId: +req.params.id}
    })
    // console.log('find or create')
    // console.log(cart)
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

Order.prototype.addrOrIncrementProduct = async function(ProductId) {
  // 'this' in an instance method refers to the instance itself
  // console.log('here!!!!!!!!!!!!!!!', ProductId)

  const product = await Product.findByPk(ProductId)
  // console.log(await this.hasProduct(product))
  if (!(await this.hasProduct(product))) {
    this.addProduct(product, {through: {quantity: 1}})
  } else {
    const quantity = await this.getProduct(product)
    console.log('assocation already exists!!!!!!!!!how do i increment quatity')

    this.addProduct(product, {through: {quantity: 10}})
  }
}

router.post('/:id', async (req, res, next) => {
  try {
    // console.log(req.body)
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
