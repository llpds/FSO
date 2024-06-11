const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User, Blog, Readinglists} = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['passwordHash'] },
    include: {
      model: Blog,
      attributes: { exclude: ['userId', 'UserId', 'createdAt', 'updatedAt'] },
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {

  const where = {}

  if (req.query.read) {
    where.isRead = req.query.read === "true"
  }

  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId', 'passwordHash'] }
      },
      {
        model: Blog,
        as: 'readings',
        attributes: ['id', 'url', 'title', 'author', 'likes', 'year'],
        through: {
          attributes: ['id','isRead'],
          where,
        },
      }
    ]
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if(password === undefined || password.length < 3) {
    res.status(400).send({ error: 'User validation failed: password is shorter than the minimum allowed length (3).' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = User.build({
    username,
    name,
    passwordHash
  })

  const savedUser = await newUser.save()
  savedUser.passwordHash = '***'
  res.json(savedUser)
})

router.put('/:username', tokenExtractor, async (req, res) => {
  const userToUpdate = await User.findOne({
    where: { username: req.params.username}
  })
  if(!userToUpdate || req.tokenUser.id !== userToUpdate.id) return res.status(401).send({ error: 'Only logged user can change his/her OWN username' })
  
  userToUpdate.username = req.body.username

  const updatedUser = await userToUpdate.save()
  updatedUser.passwordHash = '***'
  res.json(updatedUser)
})

module.exports = router