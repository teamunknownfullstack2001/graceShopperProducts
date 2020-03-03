const User = require('./user')
const Order = require('./order')
const OrderItem = require('./orderItem')
const Product = require('./products')
const orderProduct = require('./orderProduct')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Order.belongsTo(User)
User.hasMany(Order)

OrderItem.belongsTo(Order)
Order.hasMany(OrderItem)

// Product.hasMany(OrderItem) // product can be placed as order place in multiple orders from multiple users
// OrderItem.belongsTo(Product) //
Order.belongsToMany(Product, {through: orderProduct})
Product.belongsToMany(Order, {through: orderProduct})
module.exports = {
  User,
  Order,
  OrderItem,
  Product
}
