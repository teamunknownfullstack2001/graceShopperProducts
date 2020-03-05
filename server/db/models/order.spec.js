// /* global describe beforeEach it */

// const {expect} = require('chai')
// const db = require('../index')
// const Order = db.model('order')
// const Product = db.model('product')
// describe('Order model', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('orderMethods', () => {
//     describe('calulate total', () => {
//       let cody
//       const exampleProduct = {
//         name: 'pretium iaculis justo',
//         category: 'Oval',
//         description:
//           'vel pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est risus auctor sed tristique in tempus',
//         price: 490.74,
//         stock: 64
//       }
//       beforeEach(async () => {
//         // cody = await Order.create({
//         //   where: {status: 'inCart', userId: 1, total: 0.0}
//         // })
//         // const product = await Product.create(exampleProduct)
//         // Order.addProduct(product)
//         console.log(cody)
//       })

//       it('return 0 if no order product', () => {
//         // expect(cody.calculate(1)).to.be.equal(0)
//       })
//     }) // end describe('correctPassword')
//   }) // end describe('instanceMethods')
// }) // end describe('User model')
