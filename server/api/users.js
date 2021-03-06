const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
const {adminOnly, selfOnly} = require('./utlis')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'id',
        'userName',
        'email',
        'googleId',
        'type',
        'address',
        'zip',
        'phone'
      ]
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

    if (targetUser && targetUser.type !== 'admin') {
      await targetUser.destroy()
      res.json({id: req.params.id})
    } else if (targetUser && targetUser.type === 'admin') {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', selfOnly, async (req, res, next) => {
  try {
    const userToUpdate = await User.findByPk(req.params.id)

    //Only allow access to the following fields so that a user can't make him/herself an admin
    const {userName, email, password, address, zip, phone} = req.body
    if (userToUpdate) {
      await userToUpdate.update({
        userName,
        email,
        password,
        address,
        zip,
        phone
      })
      res.json(userToUpdate)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const currentUser = await User.findByPk(req.params.id)
    const updatedUser = await currentUser.update(req.body)

    res.json(updatedUser)
  } catch (error) {
    next(error)
  }
})
