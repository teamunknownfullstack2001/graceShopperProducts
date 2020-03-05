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

// Order.prototype.decrementProduct = async function(ProductId) {
//   const product = await Product.findByPk(ProductId)
//   const entry = await orderProduct.findOne({
//     where: {
//       orderId: this.id,
//       productId: ProductId
//     }
//   })
//   const quantity = entry.dataValues.quantity
//   this.addProduct(product, {
//     through: {quantity: quantity - 1}
//   })
// }

Order.prototype.addrOrIncrementProduct = async function(ProductId) {
  const product = await Product.findByPk(ProductId)
  if (!(await this.hasProduct(product))) {
    this.addProduct(product, {through: {quantity: 1}})
  } else {
    const entry = await orderProduct.findOne({
      where: {
        orderId: this.id,
        productId: ProductId
      }
    })
    const quantity = entry.dataValues.quantity
    this.addProduct(product, {
      through: {quantity: quantity + 1}
    })
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

router.delete('/:id', async (req, res, next) => {
  try {
    const [cart, created] = await Order.findOne({
      include: [{model: Product}], //,
      where: {status: 'inCart', userId: +req.params.id}
    })
    await cart.decrementProduct(+req.body.id)
    res.json(cart)
  } catch (error) {
    next(error)
  }
})
