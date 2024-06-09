const router = require('express').Router()

const { Readinglists, User } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.get('/', async (req, res) => {
  const lists = await Readinglists.findAll()
  res.json(lists)
})

router.get('/:id', async (req, res) => {
  const list = await Readinglists.findByPk(req.params.id)
  if (list) {
    res.json(list)
  } else {
    res.status(404).end()
  }
})

router.post('/', async (req, res) => {
  const { blogId, userId } = req.body

  const savedList = await Readinglists.create({
    blogId,
    userId
  })

  res.json(savedList)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const list = await Readinglists.findByPk(req.params.id)
  console.log('req.decodedToken.id', req.decodedToken.id)
  const tokenUser = await User.findByPk(req.decodedToken.id)

  if(!list) return res.status(401).send({ error: `there is no reading list with id=${req.params.id} in the database` })
  if(!tokenUser) return res.status(401).send({ error: 'This can happen if a user has a valid token, but there is no such user in the database anymore.' }) 
  if(list.userId !== tokenUser.id) return res.status(401).send({ error: 'Only logged user can change his/her OWN reading list status' })
  
  list.isRead = req.body.read

  const updatedList = await list.save()
  res.json(updatedList)
})

module.exports = router