/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('orderMethods', () => {
    describe('calulate total', () => {
      let cody

      beforeEach(async () => {
        cody = await Order.create({
          where: {status: 'inCart', userId: 1}
        })
      })

      it('return 0 if no order product', () => {
        expect(cody.calculate(1)).to.be.equal(0)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
