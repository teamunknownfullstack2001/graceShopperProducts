const router = require('express').Router()
const {Product, Tag} = require('../db/models')
const {adminOnly, userOnly} = require('./utlis')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allTags = await Tag.findAll({
      include: [
        {
          model: Product
        }
      ]
    })
    res.json(allTags)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleTag = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product
        }
      ]
    })
    res.json(singleTag)
  } catch (error) {
    next(error)
  }
})
