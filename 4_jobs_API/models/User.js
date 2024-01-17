const mongoose = require('mongoose')
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
    maxlength:12,
  }
})

module.exports = mongoose.model('User',UserSchema)