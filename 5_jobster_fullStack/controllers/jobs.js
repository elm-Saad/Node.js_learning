const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

/**(addThis) */
const showStats = async (req,res) =>{
  res.status(StatusCodes.OK).json({
    defaultStats:{

    },
    monthlyApplication:{

    }
  })
}

const getAllJobs = async (req, res) => {
  /**(addThis) */ 
  const {search,status,jobType,sort} = req.query

  const QueryObject = {
    createdBy : req.user.userId
  }

  /**start filtering logic */

  /**
   * search | status | JobType
   */
   /**search by position */
   if(search){
    // search for pattern ($regex) && its a case insensitive (i)
    QueryObject.position = {$regex:search,$options:'i'}
  }
  /** Status filter */
  if(status && status!=='all'){
    QueryObject.status = status //from enum: ['interview', 'declined', 'pending']
  }
  /** JobType filter */
  if(jobType && jobType!=='all'){
    QueryObject.jobType = jobType //from enum:['full-time','part-time','remote','internship']
  }

  let result = Job.find(QueryObject)

  /**
   * sorting
   */
  if(sort ==='latest'){
    result = result.sort('-createdAt')
  }
  if(sort ==='oldest'){
    result = result.sort('createdAt')
  }
  if(sort ==='a-z'){
    result = result.sort('position')
  }
  if(sort ==='z-a'){
    result = result.sort('-position')
  }

  /**
   * pagination using skip & limit
   */

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1 )* limit

  result = result.skip(skip).limit(limit)

  /**end */

  const jobs = await result

  const totalJobs = await Job.countDocuments(QueryObject)//=> count total jobs based on the /*query provided*/ not (based on the user jobs)
  const numOfPages = Math.ceil(totalJobs/limit)

  res.status(StatusCodes.OK).json({ jobs,totalJobs,numOfPages})
}
const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  })
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req

  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty')
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  })
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).send()
}

module.exports = {
  showStats,
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
}
