const router = require('express').Router()
const { Blog } = require('../models')
const sequelize = require('sequelize')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', 'author'), 'articles'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    group: 'author',
    order: [['likes', 'ASC']]
  })

  res.json(blogs)
})

module.exports = router