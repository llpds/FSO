const logger = require ('../utils/logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('--------------------------')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })

}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted error' })
  } else if ( error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }

  next()
}


const userExtractor = async (request, response, next) => {
  if(!request.token) {
    request.user = null
  } else {
    let uncheckedUser

    //const uncheckedUser = jwt.verify(request.token, process.env.SECRET) // cause of response 500 with expired token
    jwt.verify(request.token, process.env.SECRET, (err, decoded) => { // work correct with expired token: "message": "jwt expired"
      if(err) return response.status(401).json({ error: err })
      uncheckedUser = decoded
    })
    request.user = await User.findById(uncheckedUser.id)
  }



  next()
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}