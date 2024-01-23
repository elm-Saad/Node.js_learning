const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
     jobType:{
      type:String,
      enum:['full-time','part-time','remote','internship'],
      default:'full-time'
     },
     jobLocation:{
      type:String,
      default:'marrakech',
      require:true,
     }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Job', JobSchema)

/**
 * example:
 *  {
      "company": "Legros LLC",
      "position": "Safety Technician IV",
      "status": "declined",
      "jobType": "full-time",
      "createdBy": "62f801d0510a7c1ed2312d52",
      "createdAt": "2021-08-23T16:37:09Z"
    }
 */
