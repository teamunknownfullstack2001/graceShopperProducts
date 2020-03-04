const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(['inCart', 'placed']),
    defaultValue: 'inCart'
  } //
})

//write an instance function
// before update
// Order.prototype.getTotal
// Order.prototype.setTotal
module.exports = Order
