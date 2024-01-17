const { StatusCodes } = require('http-status-codes')
const User = require('../models/User')
const {BadRequestError} = require('../errors')
const bcrypt = require('bcryptjs')

const register = async (req,res)=>{

  const {name,email,password} = req.body

  if(!name|!email||!password){
    throw new BadRequestError('please provide all data')
  }
  // using bcrypt.js for hashing passwords
  const user = await User.create({...req.body})

  res.status(StatusCodes.CREATED).json({user})

}

const login = async (req,res)=>{
  res.send('login user')
}

module.exports = {register,login}