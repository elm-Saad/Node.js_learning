const mongoose = require('mongoose')

// create schema  
const TaskSchema = new mongoose.Schema({
  name:String,
  completed:Boolean
})

//model name
module.exports = mongoose.model('Task',TaskSchema)