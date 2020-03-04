const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(['inCart', 'placed']),
    defaultValue: 'inCart'
  },
  total: {
    type: Sequelize.DECIMAL(12, 2),
    defaultValue: 0.0
  }
})
Order.prototype.calculate = async function() {
  const products = await this.getProducts()
  const sum = products.reduce((acc, product) => {
    return acc + +product.price
  }, 0)
  console.log(products)
  console.log(sum)
  this.order = sum
  return sum
}
module.exports = Order
