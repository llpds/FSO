const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const Session = require('../models/session')
const { tokenExtractor } = require('../util/middleware')
const { Op } = require('sequelize')

router.delete('/', tokenExtractor, async (req, res) => {
    const where = {
    [Op.and]: [
      {userId: req.tokenUser.id},
      {token: req.get('authorization').substring(7)} // if need to delete only current session of user
    ]
  }

  await Session.destroy({where})
  
  res
    .status(200)
    .send({ message: `See you later. ${req.tokenUser.username}`})
})

module.exports = router