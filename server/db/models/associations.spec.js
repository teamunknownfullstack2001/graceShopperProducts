const {expect} = require('chai')
const db = require('../index')
const {Order, Product, User, Tag} = require('.')

describe('Model Associations', () => {
  beforeEach(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  it('a tag may belong to many products', async () => {
    const rug1 = await Product.create({
      name: 'rug1',
      category: 'round',
      description: 'abc',
      price: '100',
      stock: '100'
    })
    const rug2 = await Product.create({
      name: 'rug2',
      category: 'round',
      description: 'xyz',
      price: '100',
      stock: '100'
    })
    const tag1 = await Tag.create({name: 'vintage'})
    await tag1.addProducts([rug1, rug2])
    const taggedProds = await tag1.getProducts().map(product => product.name)
    expect(taggedProds).to.deep.equal(['rug1', 'rug2'])
  })

  it('a product may have many tags', async () => {
    const tag3 = await Tag.create({name: 'woven'})
    const tag2 = await Tag.create({name: 'bathroom'})
    const rug3 = await Product.create({
      name: 'rug3',
      category: 'round',
      description: 'abc',
      price: '100',
      stock: '100'
    })
    await rug3.addTags([tag3, tag2])
    const prodTags = await rug3.getTags().map(tag => tag.name)
    expect(prodTags).to.deep.equal(['woven', 'bathroom'])
  })

  it('a user can have many orders', async () => {
    const order1 = await Order.create({id: 1, status: 'placed', total: '100'})
    const order2 = await Order.create({id: 2, status: 'placed', total: '200'})
    const user1 = await User.create({
      userName: 'cody',
      email: 'cody123@email.com'
    })
    await user1.addOrders([order1, order2])
    const userOrders = await user1.getOrders().map(order => order.id)
    expect(userOrders).to.deep.equal([1, 2])
  })

  it('an order can have many products', async () => {
    const rug1 = await Product.create({
      name: 'rug1',
      category: 'round',
      description: 'abc',
      price: '100',
      stock: '100'
    })
    const rug2 = await Product.create({
      name: 'rug2',
      category: 'round',
      description: 'xyz',
      price: '100',
      stock: '100'
    })
    const order1 = await Order.create({id: 1, status: 'placed', total: '100'})
    await order1.addProducts([rug1, rug2])
    const orderedProds = await order1.getProducts().map(product => product.name)
    expect(orderedProds).to.deep.equal(['rug1', 'rug2'])
  })

  it('a product can belong to many orders', async () => {
    const order1 = await Order.create({id: 1, status: 'placed', total: '100'})
    const order2 = await Order.create({id: 2, status: 'placed', total: '200'})
    const rug3 = await Product.create({
      name: 'rug3',
      category: 'round',
      description: 'abc',
      price: '100',
      stock: '100'
    })
    await rug3.addOrders([order1, order2])
    const prodOrders = await rug3.getOrders().map(order => order.id)
    expect(prodOrders).to.deep.equal([1, 2])
  })
})
