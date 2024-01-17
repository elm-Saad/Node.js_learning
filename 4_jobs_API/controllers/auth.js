const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const {BadRequestError} = require('../errors')
const jwt = require('jsonwebtoken')

const register = async (req,res)=>{

  // const {name,email,password} = req.body
  // if(!name|!email||!password){
  //   throw new BadRequestError('please provide all data')
  // }

  
  const user = await User.create({...req.body})
  // create the token
  // const token = jwt.sign({userID:user._id,name:user.name},"jwtSecret",{expiresIn:'30d'})

  // from module 
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({user:{name:user.name},token})

}

const login = async (req,res)=>{
  res.send('login user')
}

module.exports = {register,login}