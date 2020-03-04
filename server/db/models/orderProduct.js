const Sequelize = require('sequelize')
const db = require('../db')

const orderProduct = db.define('orderproduct', {
  quantity: {
    type: Sequelize.INTEGER
  } // add column price paid,
})

module.exports = orderProduct
