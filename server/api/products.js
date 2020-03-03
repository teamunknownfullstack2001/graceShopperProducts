const router = require('express').Router
const {Product} = require('../db/models/products')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    res.json(allProducts)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findById(req.params.id)
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})
