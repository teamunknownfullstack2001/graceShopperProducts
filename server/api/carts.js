const router = require('express').Router()
const {User, Order, orderProduct, Product} = require('../db/models')

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

Order.prototype.decrementProduct = async function(ProductId) {
  const product = await Product.findByPk(ProductId)
  const hasAlready = await this.hasProduct(product)
  if (!hasAlready) {
    this.addProduct(product, {through: {quantity: 1}})
  } else {
    const entry = await orderProduct.findOne({
      where: {
        orderId: this.id,
        productId: ProductId
      }
    })
    entry.quantity = entry.dataValues.quantity - 1
    await entry.save()
  }
  return this
}

Order.prototype.removeProduct = async function(ProductId) {
  const product = await Product.findByPk(ProductId)
  await this.removeProducts(product)

  return this
}

Order.prototype.addrOrIncrementProduct = async function(ProductId) {
  const product = await Product.findByPk(ProductId)
  const hasAlready = await this.hasProduct(product)
  if (!hasAlready) {
    this.addProduct(product, {through: {quantity: 1}})
  } else {
    const entry = await orderProduct.findOne({
      where: {
        orderId: this.id,
        productId: ProductId
      }
    })
    entry.quantity = entry.dataValues.quantity + 1
    await entry.save()
  }
  return this
}

router.put('/:id', async (req, res, next) => {
  try {
    let [cart, created] = await Order.findOrCreate({
      include: [{model: Product}], //,
      where: {status: 'inCart', userId: +req.params.id}
    })
    if (req.query.type === 'createorincrement') {
      await cart.addrOrIncrementProduct(+req.body.id)
    } else if (req.query.type === 'decrement') {
      await cart.decrementProduct(+req.body.id)
    } else if (req.query.type === 'remove') {
      await cart.removeProduct(+req.body.id)
    }
    await cart.reload()
    res.json(cart)
  } catch (error) {
    next(error)
  }
})
