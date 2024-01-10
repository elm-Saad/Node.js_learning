const mongoose = require('mongoose')

// create schema  => the value od single item in a collection 
const TaskSchema = new mongoose.Schema({
  name:{
    type:String,
    required: [true, 'u must enter a value'],
    trim:true,// remove any spaces in the name 
    maxlength: [20,'name can not be more then 2 characters']
  },
  completed:{
    type:Boolean,
    default: false
  }
})

//model name => collection name
module.exports = mongoose.model('task',TaskSchema)