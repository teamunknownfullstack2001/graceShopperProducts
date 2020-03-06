/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')
const Product = db.model('product')
describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('orderMethods', () => {
    describe('calulate total', () => {
      const exampleProduct = {
        name: 'pretium iaculis justo',
        category: 'Oval',
        description:
          'vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus',
        price: 49074,
        stock: 64
      }
      const exOrder = {
        status: 'inCart'
      }
      let cody
      let cody2
      beforeEach(async () => {
        cody = await Order.create(exOrder)
        cody2 = await Order.create(exOrder)
        const product = await Product.create(exampleProduct)

        await cody.addProduct(product, {through: {quantity: 1}})
      })

      it('return 0 if no order product', async () => {
        const total = await cody2.calculate()

        expect(total).to.be.equal(0)
      })
      it('return the total if there is a order product', async () => {
        const total = await cody.calculate()

        expect(total).to.be.equal(49074)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
