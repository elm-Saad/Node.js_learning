//get module 
const Job = require('../models/Job')

const { BadRequestError, NotFoundError } = require('../errors')
const {StatusCodes} = require('http-status-codes')


const getAllJobs = async (req, res) => {
  res.send('get all jobs')
}
const getJob = async (req, res) => {
  res.send('get a single job')
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
  res.send('update a job')
}

const deleteJob = async (req, res) => {
  res.send('delete job')
}

module.exports = {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
}
