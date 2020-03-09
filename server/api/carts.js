/* eslint-disable complexity */
const router = require('express').Router()
const {User, Order, orderProduct, Product} = require('../db/models')
const {adminOnly, userOnly} = require('./utlis')
module.exports = router

router.get('/:id', async (req, res, next) => {
  // userId
  if (req.session.passport) {
    try {
      const [cart, created] = await Order.findOrCreate({
        include: [{model: Product, through: {attributes: ['quantity']}}], //,
        where: {status: 'inCart', userId: +req.params.id},
        order: [['id', 'DESC']]
      })
      res.json(cart)
    } catch (error) {
      next(error)
    }
  } else {
    res.json(req.session.cart)
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
    if (entry.quantity > 0) {
      entry.quantity = entry.dataValues.quantity - 1
      await entry.save()
    }
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
    //checking the product stock before add 1 to the entry
    if (product.stock - entry.dataValues.quantity > 1) {
      entry.quantity = entry.dataValues.quantity + 1
      await entry.save()
    }
  }
  return this
}

router.put('/:id', async (req, res, next) => {
  if (req.session.passport) {
    try {
      let [cart, created] = await Order.findOrCreate({
        include: [{model: Product}],
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
  } else {
    console.log(req.session.cart) // req.session.cart is an array here
    const product = await Product.findByPk(+req.body.id)
    if (req.session.cart === undefined) {
      req.session.cart = {
        id: 0,
        status: 'inCart',
        createdAt: '',
        updatedAt: '',
        userId: 0,
        products: []
      }
    }
    const alreadyInCart = req.session.cart.products.findIndex(
      productI => productI.id === +req.body.id
    )
    if (alreadyInCart === -1) {
      // not found
      req.session.cart.products.push({
        ...product.dataValues,
        orderproduct: {quantity: 1}
      })
    } else {
      switch (req.query.type) {
        case 'createorincrement':
          req.session.cart.products[alreadyInCart].orderproduct.quantity++
          break
        case 'decrement':
          req.session.cart.products[alreadyInCart].orderproduct.quantity--
          break
        case 'remove':
          req.session.cart.products.splice(alreadyInCart, 1)
          break
        default:
          break
      }
    }
    res.json(req.session.cart)
  }
})
