const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
const {adminOnly, userOnly, selfOnly} = require('./utlis')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id, {
      include: [{model: Order, include: {model: Product}}]
    })
    res.json(singleUser)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', adminOnly, async (req, res, next) => {
  try {
    const targetUser = await User.findByPk(req.params.id)
    if (targetUser) {
      await targetUser.destroy()
      res.status(204).json(targetUser)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', selfOnly, async (req, res, next) => {
  try {
    const userToUpdate = await User.findByPk(req.params.id)
    if (userToUpdate) {
      await userToUpdate.update(req.body)
      res.json(userToUpdate)
    }
  } catch (error) {
    next(error)
  }
})
