const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,'please provide name'],
    minlength:3,
    maxlength:50,
  },
  email:{
    type:String,
    required:[true,'please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,// unique email for every user
  },
  password:{
    type:String,
    required:[true,'please provide Password'],
    minlength:6,
  }
})



// handle what to do with the data coming from the user from the module

UserSchema.pre('save',async function(next){

  // using bcrypt.js for hashing passwords from the module 

  const salt = await bcrypt.genSalt(10)
  // the password in this docs => hash it => then when ever its cold like register on controllers/auth it will be already  hashed
  this.password = await bcrypt.hash(this.password,salt)

  next()
})

// create jwt
UserSchema.methods.createJWT = function (){
  // generate secure key on https://allKeysgenerator.com
  const token = jwt.sign({userID:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME})

  return token
}
module.exports = mongoose.model('User',UserSchema)