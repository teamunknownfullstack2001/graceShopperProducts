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

/// Add to cart
//increment/decrement quantity
//delete product from cart
router.put('/:id', async (req, res, next) => {
  // For user
  if (req.session.passport) {
    try {
      let [cart, created] = await Order.findOrCreate({
        // if no cart is found for this user, we create a new cart
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
    // For guest
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
      // If we cannot find this item in cart, we add this item in cart
      req.session.cart.products.push({
        ...product.dataValues,
        orderproduct: {quantity: 1}
      })
    } else {
      // If we can find this item in cart, we modify the quantity
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
