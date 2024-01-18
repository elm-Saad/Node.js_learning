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

    

    // attach the user to the job routes if the token is true 
    req.user = {userId:payLoad.userId,payLoad:payLoad.name}

    /**
     * other approach => search in DB and remove the password from the data returned then send the entire user
     */
    // const user = User.findById(payLoad.id).select('-password')
    // req.user = user

    next()
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid')
  }
}

module.exports = auth
