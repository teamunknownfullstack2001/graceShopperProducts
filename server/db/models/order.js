const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(['inCart', 'placed']),
    defaultValue: 'inCart'
  },
  total: {
    type: Sequelize.DECIMAL(12, 2)
  }
})

module.exports = Order
