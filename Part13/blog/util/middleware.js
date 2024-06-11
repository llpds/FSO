const { SECRET } = require('./config')
const jwt = require('jsonwebtoken')
const { Blog, User, Session } = require('../models')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    try {
      req.decodedToken = jwt.verify(token, SECRET)
    } catch{
      return res.status(401).json({ error: 'token invalid' })
    }

    req.tokenUser = await User.findByPk(req.decodedToken.id)
    if (!req.tokenUser || req.tokenUser.disabled === true)
      return res.status(401).json({ error: 'check is user exist and active' })
    
    req.session = await Session.findOne({where: { token }})
    if(!req.session || req.session.active === false )
      return res.status(401).json({ error: 'it is not active session' })
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

module.exports = { tokenExtractor, blogFinder }