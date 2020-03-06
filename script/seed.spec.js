'use strict'
/* global describe it */
const {expect} = require('chai')
const seed = require('./seed')
const {Product, User, Order, Tag} = require('../server/db/models/')

describe('seed script', async () => {
  it('completes successfully', seed)

  it('populates the database with at least ten products', async () => {
    const seedProducts = await Product.findAll()
    expect(seedProducts).to.have.lengthOf.at.least(10)
  })

  it('populates the database with at least five users', async () => {
    const seedUsers = await User.findAll()
    expect(seedUsers).to.have.lengthOf.at.least(5)
  })

  it('populates the database with at least four tags', async () => {
    const seedTags = await Tag.findAll()
    expect(seedTags).to.have.lengthOf.at.least(4)
  })

  it('populates the database with at least three orders', async () => {
    const seedOrders = await Order.findAll()
    expect(seedOrders).to.have.lengthOf.at.least(3)
  })
})
