//get module 
const Job = require('../models/Job')

const { BadRequestError, NotFoundError } = require('../errors')
const {StatusCodes} = require('http-status-codes')


const getAllJobs = async (req, res) => {
  // get all jobs created by this user on every req => and then sort them by the latest
  const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt')

  res.status(StatusCodes.OK).json({jobs,count:jobs.length})
}

const getJob = async (req, res) => {
  // get id of the job and the userId
  const {user:{userId},params:{id:JobId}} = req
  const singleJob = await Job.findOne({
    _id:JobId,
    createdBy:userId
  })

  if(!singleJob){
    throw new NotFoundError('No job with is '+ JobId)
  }

  res.status(StatusCodes.OK).json({singleJob})
}

const createJob = async (req, res) => {

  //get the user id using createdBy in the module
    /**
   * in the req.user => from the authentication middleware
    * {
    "payLoad": "astro"
  }
   */
  req.body.createdBy = req.user.userId // now this job is assign to the ne created it only
  // add to DB
  console.log(req.user);
  const  job = await Job.create(req.body)


  res.status(StatusCodes.CREATED).json({ job })

}

const updateJob = async (req, res) => {
  // get id of the job and the userId and body of the req
  const {
    user:{userId},
    params:{id:JobId},
    body:{company,position}
  } = req
  

  if(company === '' || position === ''){
    throw new BadRequestError('company or position fields cannot be empty')
  }


  const job = await Job.findByIdAndUpdate({
    _id:JobId,
    createdBy:userId,
  },req.body,{new: true, runValidators:true})

  if(!job){
    throw new NotFoundError('No job with is '+ JobId)
  }

  res.status(StatusCodes.OK).json({job})
}

const deleteJob = async (req, res) => {
  // get id of the job and the userId and body of the req
  const {
    user:{userId},
    params:{id:JobId},
  } = req




  const job = await Job.findOneAndRemove({
    _id:JobId,
    createdBy:userId,
  })

  if(!job){
    throw new NotFoundError('No job with is '+ JobId)
  }

  res.status(StatusCodes.OK).json({msg:'DONE'})
}

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
}
