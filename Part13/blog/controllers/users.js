const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User, Blog } = require('../models')
const { SECRET } = require('../util/config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ['passwordHash'] },
    include: {
      model: Blog,
       attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId', 'passwordHash'] }
      },
      {
        model: Blog,
        as: 'blogs_to_read',
        attributes: { exclude: ['userId', 'passwordHash']},
        through: {
          attributes: []
        },
        include: {
          model: User,
          attributes:['name']
        }
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
  const user = await User.findOne({
    where: { username: req.params.username}
  })
  const tokenUser = await User.findByPk(req.decodedToken.id)
  if(!tokenUser || !user || tokenUser.id !== user.id) return res.status(401).send({ error: 'Only logged user can change his/her OWN username' })
  
  user.username = req.body.username

  const updatedUser = await user.save()
  updatedUser.passwordHash = '***'
  res.json(updatedUser)
})

module.exports = router