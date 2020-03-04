const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://images.rugimg.com/3140387/3140387_image_1010.jpg?canvas=740%2C700&fit=bounds&bg-color=white&height=700&width=740&quality=85'
  },
  category: {
    type: Sequelize.STRING,
    // type: Sequelize.ENUM([''])
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL(12, 2), //Integers more efficient  store price in cent.
    // validate price >= 0
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false
    // validate stock >= 0
  },
  tags: Sequelize.ARRAY(Sequelize.STRING) // make a tag table
})

module.exports = Product
