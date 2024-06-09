const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { Blog, User } = require('../models')
const { tokenExtractor, blogFinder } = require('../util/middleware')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
  
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        {title: {[Op.substring]: req.query.search}},
        {author: {[Op.substring]: req.query.search}}
      ]
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [['likes', 'DESC']]
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const data = {...req.body, userId: user.id, date: new Date()}
  console.log('data', data)
  const blog = await Blog.create(data)
  res.json(blog)
})


router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  const tokenUser = await User.findByPk(req.decodedToken.id)
  if (req.blog && tokenUser && tokenUser.id === req.blog.userId) {
    await req.blog.destroy()
    return res.status(204).end()
  }

  res.status(401).send({ error: 'Only creator can delete blog' })
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

module.exports = router