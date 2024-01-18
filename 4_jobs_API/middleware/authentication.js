const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const auth = async (req, res, next) => {
  // get headers
  const authHeader = req.headers.authorization

  if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new UnauthenticatedError('Authentication invalid')
  }

  //get token
  const token  = authHeader.split(' ')[1]

  try {
    // verify the token
    const payLoad = jwt.verify(token,process.env.JWT_SECRET)
    // attach the user to the job routes
    req.user = {userId:payLoad.userId,payLoad:payLoad.name}
    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = auth
