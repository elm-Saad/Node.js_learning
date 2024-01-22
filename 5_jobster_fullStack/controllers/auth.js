const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
 
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ 
    /**(addThis) */
    user: { 
      email:user.email,
      lastName:user.lastName,
      location:user.location,
      name: user.name,
      token
    }
  })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  // compare password
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({
    /*(addThis) send one object*/
    user: { 
      email:user.email,
      lastName:user.lastName,
      location:user.location,
      name: user.name,
      token
    }})
}

/**(addThis) */
const UpdateUser = async (req,res)=>{
  const {email,name,lastName,location} = req.body
  if(!email || !name || !lastName || !location){
    throw new BadRequestError('Please provide all values')
  }

  // get that is user currently logIn 
  const user = await User.findOne({_id: req.user.userId})

  user.email = email
  user.name = name
  user.lastName = lastName
  user.location = location
  
  // save the updated user to the DB => trigger UserSchema.pre('save', .. in the models (so the original password is not match anymore because its get hashed X times)
  /**or u can use User.findAndUpdate() */
  await user.save()
  /**
   * solution is using isModified() => to check what the user is modifying
   * lock at 
   * UserSchema.pre('save', .. in the models
   */



  const token = user.createJWT()

  // act like register or a login again
  res.status(StatusCodes.CREATED).json({ 
    
    user: { 
      email:user.email,
      lastName:user.lastName,
      location:user.location,
      name: user.name,
      token
    }
  })

}
module.exports = {
  register,
  login,
  UpdateUser
}
