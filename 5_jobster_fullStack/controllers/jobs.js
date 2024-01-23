const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
/**(addThis) */
const mongoose = require('mongoose')
const moment = require('moment')

/**(addThis) */
const showStats = async (req,res) =>{

  /**set up aggregate pipeline */
  let stats = await Job.aggregate([
    //first stage => match jobs base on the current user (job of the current user)
    //mongoose.Types.ObjectId=> to turn the String (req.user.userId) => to object id mongoose takes
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    //second stage=> group base on status => count how many pending / Interviews  / Declined =>using count: { $sum: 1 }
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  // console.log(stats);
  /**
   * [
      { _id: 'declined', count: 22 },
      { _id: 'pending', count: 28 },
      { _id: 'interview', count: 25 }
    ]
   */

    // the front end looks for data like 
    /**
     *  {
     *    declined: 22 ,
     *    pending: 28 ,
     *    interview: 25
     *  }
     */

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;

    acc[title] = count;
    return acc;
  }, {});

  // console.log(stats);
  /**
   * { interview: 25, declined: 22, pending: 28 }
   */

  /**
   * if there is a new user with no data the stats object here will be like => {}
   * to solve this => create defaultStats in this case
   */

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };



  /**
   * base on the chart library the setup of monthlyApplications will send the data 
   * that make the most sense to the library
   */

  let monthlyApplications = await Job.aggregate([
    //first stage => match jobs base on the current user (job of the current user)
    //mongoose.Types.ObjectId=> to turn the String (req.user.userId) => to object id mongoose takes
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    // second stage => get year (provided by mongoDB) and the month
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },// have the count
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },// - =>data in deciding order (last month -> new month )=> last months and ech month have a year
    { $limit: 6 },//only get the last 6 month
  ]);

  // console.log(monthlyApplications);
  /**
   * [
      { _id: { year: 2022, month: 8 }, count: 5 },
      { _id: { year: 2022, month: 7 }, count: 6 },
      { _id: { year: 2022, month: 6 }, count: 5 },
      { _id: { year: 2022, month: 5 }, count: 4 },
      { _id: { year: 2022, month: 4 }, count: 6 },
      { _id: { year: 2022, month: 3 }, count: 8 }
    ]
   */

    /**
     * the front end (charts library need the data to be like  : 
     * { date: 'Mar 2022', count: 8 },
        { date: 'Apr 2022', count: 6 },
        { date: 'May 2022', count: 4 },
        { date: 'Jun 2022', count: 5 },
        { date: 'Jul 2022', count: 6 },
        { date: 'Aug 2022', count: 5 }

        using moment js for date formatting
     */
  monthlyApplications = monthlyApplications.map((item) => {
      const { _id: { year, month },count} = item;
      // set up new date => 
      const date = moment().month(month - 1).year(year).format('MMM Y');
      return { date, count };
  }).reverse();// send the last month (new one ) as the last item and the (old month) as the first items in the data

  // console.log(monthlyApplications);

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
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
