const router = require('express').Router()
const {Product, Tag} = require('../db/models')
const {adminOnly, userOnly} = require('./utlis')
module.exports = router

router.get('/', userOnly, async (req, res, next) => {
  try {
    const allProducts = await Product.findAll({
      include: [
        {
          model: Tag
        }
      ]
    })
    res.json(allProducts)
  } catch (error) {
    next(error)
  }
})

router.post('/', userOnly, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body, {
      include: [
        {
          model: Tag
        }
      ]
    })
    if (newProduct) {
      res.json(newProduct)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:id', userOnly, async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Tag
        }
      ]
    })
    res.json(singleProduct)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', adminOnly, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    if (product) {
      const deletedProduct = await product.destroy()
      res.status(204).json(product) // look up status for delete
    }
  } catch (error) {
    next(error)
  }
})
